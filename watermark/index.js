const { RPCClient } = require("@alicloud/pop-core");
var client = new RPCClient({
  endpoint: "http://imm.cn-shenzhen.aliyuncs.com",
  accessKeyId: '',
  accessKeySecret: '',
  apiVersion: "2017-09-06",
});
(async () => {
  try {
        // var params = {
        //   Project: "test-project",
        //   ImageUri: "oss://watermark-shenzheng/source/1605680005172.jpg",
        //   TargetUri: "oss://watermark-shenzheng/dist/1605680005172-out1.jpg",
        //   Content: "秋风",
        //   Model: "DWT"
        // };
        // var result = await client.request("EncodeBlindWatermark", params);
        var params = {
          Project: "test-project",
          ImageUri: "oss://watermark-shenzheng/dist/1605680005172-out-scale.jpg",
            TargetUri: "oss://watermark-shenzheng/dist/1605680005172-out-decode-scale.jpg",
            Model: "DWT"
        };
        var result = await client.request("DecodeBlindWatermark", params);
        
        console.log(result);
      } catch (err) {
        console.log(err);
      }
})()