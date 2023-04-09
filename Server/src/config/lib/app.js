module.exports.start = ()=>{
    const app = require('./express')();

    app.listen(app.get('port'), ()=>{
        console.log(`Server is Running on PORT=> ${app.get('port')}`);
    })

}