window.onpageshow = function(event) {
    url_get = "https://script.google.com/macros/s/AKfycbxAO5ZuOdIebcFqnwwKkv1G1Mt6BF6axxgK5s_VFh7uhJono7OF2gbVWxufYCmpvzsT/exec"
    let url = new URL(window.location.href);
    let sub_title = document.getElementById('sub_title')
    let sub_content = document.getElementById('sub_content')
    // URLSearchParamsオブジェクトを取得
    let params = url.searchParams;

    $.ajax({
        url: url_get,
        type: 'get',
        data: {"mode":"mail_auth","cert_id":params.get('cert_id')},
        dataType: 'json'
        }).done(function(data){
            var data_stringify = JSON.stringify(data);
            var data_json = JSON.parse(data_stringify);
            if (data_json == "success"){
                sub_title.innerText = "認証に成功しました"
                sub_content.innerText = "アプリで操作してください"
            } else if (data_json == "Not Found Cert_id"){
                sub_title.innerText = "認証時間切れ"
                sub_content.innerText = "認証コードを再発行してください (404)"
            } else if (data_json == "Cert_time_failed"){
                sub_title.innerText = "認証時間切れ"
                sub_content.innerText = "認証コードを再発行してください (252)"
            }
            return;
        }).fail(function(data){
            alert('通信に失敗しました。もう一度お試しください。');
    });
}