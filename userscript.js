// ==UserScript==
// @name         Bulk Booster Pack Unpacker
// @version      1
// @description  Unpack all Booster Packs!
// @author       Kladdkaka
// @match        http://steamcommunity.com/profiles/*/inventory/
// @grant        none
// ==/UserScript==
var unpackButton = '<a class="btn_small btn_grey_white_innerfade" href="javascript:unpackAll()"><span>Unpack All Cards</span></a>';
document.getElementById('inventory_pagecontrols').insertAdjacentHTML("beforeBegin", unpackButton);

var unpack = function(appid, itemid) {
    var submitUrl = g_strProfileURL + "/ajaxunpackbooster/";
	
    $J.post(submitUrl, {
            appid: appid,
            communityitemid: itemid,
            sessionid: g_sessionID
        })
        .done(function(data) {}).fail(function() {});

};

var unpackAll = function() {
    var inv = g_ActiveInventory.rgInventory;
    var str = "";
    var sum = 0;
    for (var item in inv) {
        var tags = inv[item].tags;
        var x = tags.filter(function(tag) {
            return (tag.internal_name == "item_class_5");
        });
        if (x.length == 1) {
            unpack(inv[item].market_fee_app, inv[item].id);
        }
        sum = sum + x.length;
    }
    alert('you are unpacking ' + sum + 'booster packs :)');
}
