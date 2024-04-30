const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth : true,
    authOptional : true,

    onConnect(session  , cb){
        console.log("onconnect" + session.id)
        cb()
    },

    onMailFrom(address , session , cb){
        console.log(`onmail from` , address.address , session.id)
        cb()
    },

    onRcptTo(address , session , cb){
        console.log(`on reciept to` , address.address , session.id)
        cb();
    },

    onData(stream , session , cb){
        stream.on( 'data' , (data)=>console.log(`on data  ${data.toString()}` ))
        stream.on('end' , cb)
    }
});

server.listen(25);

server.on("error", (err) => {
    console.log("Error %s", err.message);
});