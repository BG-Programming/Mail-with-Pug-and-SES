/**************************************************************************************************
    File Name   : mailer.js

    Description :

    
    Update History   
      2022.06           BGKim       Create  
**************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Import Modules                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////
import AWS       from 'aws-sdk';


AWS.config      = new AWS.Config({
    accessKeyId: 'YOUR_ACCESS_KEY', 
    secretAccessKey: 'YOUR_SECRET_KEY', 
    region: 'YOUR_REGION'
});
const ses         = new AWS.SES();


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Constants                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////
const SUPPORTER_MAIL  = "help@flabo.io";


export default class Mailer {
    private static _instance  : Mailer | null = null;
    public static getInstance() : Mailer {
        if( Mailer._instance === null )
            Mailer._instance  = new Mailer();
        return Mailer._instance;
    }


    public async sendMail( fromAddress : string, toAddress : string[], title : string, htmlData : string) {
        "use strict";
        return await new Promise(function(resolve, reject) {
            ses.sendEmail({ 
                    Source: fromAddress, 
                    Destination: { ToAddresses: toAddress },
                    Message: {
                        Subject:{ Data: title },
                        Body: { Html: { Data: htmlData }}
                    }
                }, 
                (err)=>{
                    return err ? reject(err) : resolve(undefined)
                }
            );
        });
    }



    public async sendMailWithPlainText( fromAddress : string, toAddressWithComma : string, title : string, stringData : string)
    {
        "use strict";
        return await new Promise(function(resolve, reject) {
            ses.sendEmail( {
                    Source: fromAddress, 
                    Destination: { ToAddresses: [ toAddressWithComma ] },
                    Message: {
                        Subject: {  Data: title },
                        Body: { Text: {  Data: stringData } }
                    }
                }, 
                function(err) {
                    return err ? reject(err) : resolve(undefined)
                }
            );
        });
    }

}
