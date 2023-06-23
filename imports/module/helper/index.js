const generateUnixString = (length)=> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

const createTransID = (id)=>{
    let result= ``
    if(id < 10 ){
        let i = parseInt(id)+ 1
        result= "0000"+i
    }
    else if(id < 100 ){
        let i = parseInt(id)+ 1
        result= "000"+i
    }
    else if(id < 1000 ){
        let i = parseInt(id)+ 1
        result= "00"+i
    }
    else if(id < 10000 ){
        let i = parseInt(id)+ 1
        result= "0"+i
    }
    else if(id < 10000 ){
        let i = parseInt(id)+ 1
        result= i
    }
    return result
}

const funcSelect2 = ()=>{
    $('.select2').select2({width: '500%'})
    $('.select2-selection--single').css('height','36px')
}

const responseFormSelect = (id,value)=>{
    if (value === null) {
        $(`#${id}`).next('.select2-container').addClass('missing')
        .find('.select2-selection').css('border', '1px solid #dc3545')
        .find('.select2-selection__rendered').css('color', '#dc3545')
    } else {
        $(`#${id}`).next('.select2-container').removeClass('missing')
        .find('.select2-selection').css('border', '')
        .find('.select2-selection__rendered').css('color', '')
    }
}

const responseFormInput = (id,value)=>{
    if (value == '') {
        $(`#${id}`).addClass('error')
    } else {
        $(`#${id}`).removeClass('error')
        $(`#${id}`).css({
            'border': '',
            'color': ''
        })
    }
}


module.exports = {
    createTransID,
    funcSelect2,
    responseFormSelect,
    responseFormInput,
    generateUnixString
    
}