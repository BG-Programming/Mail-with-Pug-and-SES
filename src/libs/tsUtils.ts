import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import pug      from "pug";
import assert from "assert";


export default {

extractYoutubeVideoId : function (url : string) : string {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : "";
},

createRandomText : function ( len? : number ) {
    let text = "";
    if( len === undefined )
        len = 32;

    // 233a0953-6a95-4fa3-aae0-64b965985ee8
    // 012345678901234567890123456789012345
    do {
        let strUuid = uuidv4();                
        text = text + strUuid.substring(0,8) + strUuid.substring(9,13) + strUuid.substring(14,18) + strUuid.substring(19,23) + strUuid.substring(24);        
    } while( text.length < len )

    return text.substring(0,len);
},
createRandomNumberString : function(len : number) {
    if( !len )
        len = 4;
            
    let number = "";
    for( var i =0;	i < len;	++i )
        number +=  Math.floor( Math.random() * 10 ) ;
    return number;
},
compileJade : function (path : string, params : Object) {
	"use strict";
	let strJade = fs.readFileSync(path, "utf8");
	let fn = pug.compile(strJade);
	let html = fn(params);
	// console.log(html);
	return html;
},
removeDashForPhoneNumber : function (phoneNumber : string) {
	"use strict";
    assert(phoneNumber);
    return phoneNumber.replace(new RegExp("-", 'g'), "");	
}





}

