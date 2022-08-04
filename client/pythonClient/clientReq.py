import json
import requests
import os

namesArr = []
os.chdir(r'/Users/mop/Desktop/blockServer/client/pythonClient')
with open('ip.txt', "r") as ip_list:
    for address in ip_list:
        url = "http://"+address+":5000/"
        request = requests.get(url+"getBlocks")
        jsonBlocks = json.loads(request.text)
        if jsonBlocks:
            for key in jsonBlocks:
                namesArr.append(str(key))
                with open('files/'+key, 'w') as f:
                    f.write(json.dumps(jsonBlocks[key]))
                    Data = {
                        "val":  True,
                        "files": namesArr
                    }
            postReq = requests.get(
                url+"confirm", params=Data)
        else:
            Data = {
                "val":  False
            }
            postReq = requests.get(
                url+"confirm", params=Data)
