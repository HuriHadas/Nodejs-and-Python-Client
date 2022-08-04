const express = require("express");
const app = express();
const port = 5000;
const fs = require('fs');
let dirname = "/Users/mop/Desktop/blockServer/server/blockJson"

app.get("/getBlocks", (req,res) =>{
    let i=0;
    let lenFiles;
    let filePath="";
    let newData="";
    let tembel="";
    let arrayTembel=[];
    let size=0;
    fs.readdir(dirname, async function(err, files) {
        if (err) {
           console.log(err)
           return res.status(401).json({
            error: [
              {
                errorMessage: err.message,
              },
            ],
        })
        } else {
            lenFiles =files.length;
            if (!lenFiles) {
                // directory appears to be empty
                return res
            }
           else{
                for (
                    i=0;i<files.length;i++){
                    filePath =dirname+"/"+files[i]//file's path
                    if(size < 10485760){//checks if its smaller than 10 mg
                        newData =fs.readFileSync(filePath, "utf-8")
                        tembel= JSON.stringify(files[i]) +":" +newData 
                        arrayTembel.push(tembel)
                        size = Buffer.byteLength(tembel);
                    }
                    else{
                        break;
                    }
                }  
           }
           res.send("{"+arrayTembel+"}");
        }
    });
})

app.get("/confirm", (req,res)=> {
    if(req.query.val){
        let filesToErase = [req.query.files];
        let filePath;
        for( i=0; i<filesToErase.length; i++){
            filePath =dirname+"/"+filesToErase[i]
            fs.unlinkSync(filePath)
        }
        res.json({"status":"deleted"});
    }
    else{
        res.json({"status":"nothing to delete"});
    }
})


app.listen(port, () => console.log("App listening on port " + port+"!"));
