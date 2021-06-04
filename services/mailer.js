const sgMail = require('@sendgrid/mail');

module.exports = {
    sendMail: (data) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

         const msg = {
             to: data.to,
             from: process.env.SENDGRID_FROM_MAIL,
             subject: data.subject,
             html: data.body,
         };

        return (async () => {
            try {
                await sgMail.send(msg);
                return { ok: true };
            } catch (error) {
                if (error.response) {
                    return error.response.body;
                } else {
                    return error.message;
                }
            }
        })();
    },
};
