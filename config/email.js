const { EM_USER, EM_PASS, EM_HOST, EM_PORT } = process.env;

module.exports = {
    user: EM_USER,
    pass: EM_PASS,
    host: EM_HOST,
    port: EM_PORT
}