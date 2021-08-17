## Overview
This system is responsible for delivering important or urgent notification to the targets. 

### Hawk supervisor cli
```
ssh -i ./hawk-supervisor.pem ubuntu@notifications.eagle3dstreaming.com "node ses-notifier/cli/supervise.js -s https://ms1.eagle3dstreaming.com:500 -p 500"
```
Here, `https://ms1.eagle3dstreaming.com` is the supervising website. `500` is the port number.
In our system, we serve controlpanel in 500 PORT. 



### Mail server
Responsible for recieving mails from website form. Runs at PORT `1010`
run `yarn mail` or `node bin.js`

