const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

const transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

const generateHtml = (file, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options)
    return juice(html);
}

module.exports = async ({email, subject, url, file}) => {
    const html = generateHtml(file, {url});
    const text = htmlToText.fromString(html);

    let info = {
        from: '"UpTask" <no-reply@uptask.com>',
        to: email,
        subject,
        text,
        html,
    };

    const sendMail = util.promisify(transport.sendMail, transport);
    return sendMail.call(transport, info);
}