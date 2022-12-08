function encrypt(data){
    return 'encrypted data'
}
function send(url, data){
    const encrypted = encrypt(data);
    console.warn('Sending encrypted data', encrypted, 'to', url);
}


module.exports = {
    send
}
