const nodemailer = require('nodemailer');
const moment = require('moment')

nodemailer.sendMail = Meteor.wrapAsync(nodemailer.sendMail);
nodemailer.close = Meteor.wrapAsync(nodemailer.close);

const sendMail = async(dataRequest,subjectTag,emailTo, type,nameTO,appStatus)=>{
    console.log('send mail...');
    
    const baseURL = `https://finance.egogohub.com`
    const logo = `https://finance.egogohub.com/assets/img/egogo-logo.png`
    let linkDetail = `https://salesdev.egogohub.tech/otp/approval`
    let logoApproved = ``
    let statusRequest = ``
    let messageText = ``
    let btnActions = ``
    let titleHi = ``
    if (type === 'request') {
        logoApproved = `${baseURL}/assets/img/clock.png`
        statusRequest = `New OTP Request`
        messageText = `<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                        <span style="font-size:16px;">
                            New request OTP  <strong>${dataRequest.marketplace.toUpperCase()}</strong> <strong>${dataRequest.brand.toUpperCase()}</strong> needs approval, request on <strong><span>${moment(dataRequest.requestBy.requestDate).add(7, 'hours').format('dddd, DD MMM YYYY HH:mm')}.</span></strong>
                        </span>
                    </p>`
        btnActions = `<a href="${linkDetail}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#113636;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                        <span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;">
                            <span dir="ltr" style="word-break: break-word; line-height: 32px;">CLICK HERE</span>
                        </span>
                    </a>`

    } else {
        titleHi =`<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;"><span style="font-size:16px;">Hi <strong><u>${nameTO}</u></strong>,</span></p>`
    
        if (appStatus == 'Y') {
            linkDetail = `https://salesdev.egogohub.tech/otp/request/${dataRequest._id}`
            logoApproved = `${baseURL}/assets/img/check-icon.png`
            statusRequest = `OTP Approved`
            messageText = `<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                            <span style="font-size:16px;">
                                Your request OTP <strong>${dataRequest.marketplace.toUpperCase()}</strong> <strong>${dataRequest.brand.toUpperCase()}</strong> success approved on <strong><span>${moment(dataRequest.approveDate).add(7, 'hours').format('dddd, DD MMM YYYY HH:mm')}.</span></strong>
                            </span>
                        </p>`
            btnActions = `<a href="${linkDetail}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#113636;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                            <span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;">
                                <span dir="ltr" style="word-break: break-word; line-height: 32px;">CLICK HERE</span>
                            </span>
                        </a>`
        } else {
            linkDetail = `https://salesdev.egogohub.tech/otp/request/${dataRequest._id}`
            logoApproved = `${baseURL}/assets/img/close.png`
            statusRequest = `OTP Rejected`
            messageText = `<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                            <span style="font-size:16px;">
                                Your request OTP <strong>${dataRequest.marketplace.toUpperCase()}</strong> <strong>${dataRequest.brand.toUpperCase()}</strong> rejected on <strong><span>${moment(dataRequest.rejectDate).add(7, 'hours').format('dddd, DD MMM YYYY HH:mm')}.</span></strong>
                            </span>
                        </p>`
            btnActions = `<a href="${linkDetail}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#113636;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                            <span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal;">
                                <span dir="ltr" style="word-break: break-word; line-height: 32px;">CLICK HERE</span>
                            </span>
                        </a>`
        }
    
    
    }                      
    
    const HTML_EMAIL = `<!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css">

        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }
    
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }
    
            p {
                line-height: inherit
            }
    
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }
    
            @media (max-width:700px) {
                .row-content {
                    width: 100% !important;
                }
    
                .mobile_hide {
                    display: none;
                }
    
                .stack .column {
                    width: 100%;
                    display: block;
                }
    
                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }
    
                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>
    
    <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;">
            <tbody>
                <tr>
                    <td>
                        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:10px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="${logo}" style="display: block; height: auto; border: 0; width: 277px; max-width: 100%;" width="277" alt="Egogohub Indonesia" title="Egogohub Indonesia"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #eefcfc; color: #000000; width: 680px;" width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;padding-top:70px;">
                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="${logoApproved}" style="display: block; height: auto; border: 0; width: 93px; max-width: 100%;" width="93" alt="Check Icon" title="Check Icon"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:25px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                    <div style="font-family: Georgia, 'Times New Roman', serif">
                                                                        <div class style="font-size: 14px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 16.8px; color: #2f2f2f; line-height: 1.2;">
                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:42px;">${statusRequest}</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="text_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #2f2f2f; line-height: 1.5;">
                                                                            ${titleHi}
                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">&nbsp;</p>
                                                                            ${messageText}
                                                                            
                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">&nbsp;</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="button_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="text-align:center;padding-bottom:70px;">
                                                                    <div class="alignment" align="center">
                                                                        
                                                                        ${btnActions}
                                                                        
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:40px;padding-left:30px;padding-right:30px;padding-top:40px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #000000; line-height: 1.5;">
                                                                            <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">For further questions, please reach us at it@egogohub.com.</span></p>
                                                                            <p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;">This email is automatically generated by system, plase do not reply.</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #123434; color: #000000; width: 680px;" width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class style="font-size: 14px; mso-line-height-alt: 21px; color: #f9f9f9; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                            <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 21px;"><span style="font-size:14px;"><strong>PT. EGOGOHUB INDONESIA</strong></span></p>
                                                                            <p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;">Rukan Elang Laut Blok F 1&2 Jl. Pantai Indah Selatan, Penjaringan, Jakarta Utara<br>DKI Jakarta - Indonesia</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class style="font-size: 12px; mso-line-height-alt: 18px; color: #0c1313; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 18px;">
                                                                            <span style="font-size:12px;">${moment().format('YYYY')} © All Rights Reserved | Egogohub OTP Center </span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>
    
    </html>`
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 465,
        pool : true,
        auth: {
            user: 'erp@egogohub.com',
            pass: 'P@ssword12345'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
        
    const mailOptions = {
        from: 'erp@egogohub.com',
        to: `${emailTo}`,
        bcc: 'it.log.egogohub@gmail.com',
        subject: `OTP CENTER | ${subjectTag == undefined ? 'Egogohub' : subjectTag}`,
        html: HTML_EMAIL
    };
    
    transporter.sendMail(mailOptions, (err, info)=>{
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail