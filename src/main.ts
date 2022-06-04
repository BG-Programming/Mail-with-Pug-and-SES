import {tsUtils, define, config} from "@tsstdlib";
import Mailer from "./components/mailer";

async function sendMailWithFilename(title: string, toAddress : string, pugFileName : string, mailParams : Object) {
    "use strict";    
    await Mailer.getInstance().sendMail(
        define.SUPPORTER_MAIL, 
        [toAddress], 
        title,
        tsUtils.compileJade (
            `src/templates/mail/${pugFileName}`, mailParams
        )
    );        
};

async function sendEmailAuthCode(toAddress : string, userName : string) {
    const authCode = tsUtils.createRandomText(config.AUTH_EMAIL_CODE_LENGTH);
    await sendMailWithFilename(
        "[BGProgramming] 이메일 인증", 
        toAddress, 
        "email_auth_code.pug",
        { userName, authCode }
    );

}

function main() {
    (async ()=>{        
        await sendEmailAuthCode("to address email", "name");        
    })();
}

(function onInit(){
    main();
})();


