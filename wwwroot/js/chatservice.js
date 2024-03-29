﻿var chatService = {
    groupID: 0,
    userPic: '',
    groupHostObj: '',
    contactArr: [],
    LastMsgID: 0,
    fnloadContactData: function () {
        $.ajax({
            url: '/Account/GetAllContactList',
            dataType: "json",
            data: {},
            method: 'GET',
            success: function (data) {
                var playdataTable = $('.users');
                playdataTable.empty();
                var isFirst = true;

                chatService.contactArr = [];
                chatService.contactArr = data.data;

                $(data.data).each(function (index, relationModelObj) {


                    if (!relationModelObj.isSelfAccount) {
                        if (isFirst && (chatService.groupID == null || chatService.groupID == 0)) {
                            isFirst = false;
                            chatService.groupID = relationModelObj.groupID;
                            chatService.userPic = relationModelObj.contactPic;
                        }
                        var ppic = (relationModelObj.contactPic ? '/Blogs/ProfileData/' + relationModelObj.contactPic : 'https://www.bootdey.com/img/Content/avatar/avatar3.png');
                        playdataTable.append('<li onclick="chatService.fnLoadSelectedChat(' + relationModelObj.groupID +');" class="person" data-chat="person1"><div class="user"><img src="' + ppic + '" alt="' + relationModelObj.groupID + '">' +
                            '</div><p class="name-time"><span class="name">' + relationModelObj.contactName + '</span><br /><span class="time">' + relationModelObj.lastDateTime + '</span></p><span id="count_' + relationModelObj.groupID+'" class="badge" style="display:none"></span></li>');
                    }
                    else
                        chatService.groupHostObj = relationModelObj;
                });
                chatService.fnloadChatData();
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    },
    fnLoadSelectedChat: function (groupId) {
        chatService.groupID = groupId;
        chatService.fnloadChatData();
    },
    fnloadChatData: function () {
        const messagesDiv = document.getElementsByClassName('chatContainerScroll');
        $.ajax({
            url: '/Account/GetAllChat',
            dataType: "json",
            data: { 'groupID': chatService.groupID, 'LastMsgID': chatService.LastMsgID },
            method: 'GET',
            success: function (data) {
                $('toName').html("");
                if (data.data.length > 0) {
                    var playdataTable = $('.chatContainerScroll');
                    if (chatService.LastMsgID == 0)
                        playdataTable.empty();

                    var groupPartyObj = chatService.fnfinditemFromContactList(chatService.contactArr, 'groupID', chatService.groupID);
                    $('#toName').html(groupPartyObj[0].contactName);
                    $(data.data).each(function (index, relationModelObj) {

                        if (relationModelObj.isSenderSelfAccount) {
                            var ppic = (chatService.groupHostObj.contactPic ? '/Blogs/ProfileData/' + chatService.groupHostObj.contactPic : 'https://www.bootdey.com/img/Content/avatar/avatar3.png');
                            playdataTable.append('<li class="chat-right"><div class="chat-hour">' + relationModelObj.dateCreated + '</div><div class="chat-text">' + relationModelObj.chatMessage + '</div>' +
                                '<div class="chat-avatar"><img src="' + ppic + '" alt="Retail Admin">' +
                                '<div class="chat-name">' + chatService.groupHostObj.contactName + '</div></div></li>');
                        }
                        else {
                            var ppic = (groupPartyObj[0].contactPic ? '/Blogs/ProfileData/' + groupPartyObj[0].contactPic : 'https://www.bootdey.com/img/Content/avatar/avatar3.png');
                            playdataTable.append('<li class="chat-left"><div class="chat-avatar"><img src="' + ppic + '">' +
                                '<div class="chat-name">' + groupPartyObj[0].contactName + '</div></div><div class="chat-text">' + relationModelObj.chatMessage + '</div>' +
                                ' <div class="chat-hour">' + relationModelObj.dateCreated + '</div></li>');
                        }

                      //  chatService.LastMsgID = relationModelObj.msgID;
                    });

                    messagesDiv[0].scrollTop = messagesDiv[0].scrollHeight;
                }
                else if (chatService.LastMsgID == 0){
                    $('.chatContainerScroll').empty()
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    },
    fnfinditemFromContactList: function (obj, key, val) {

        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(chatService.fnfinditemFromContactList(obj[i], key, val));
            } else if (i == key && obj[key] == val && obj['isSelfAccount'] == false) {
                objects.push(obj);
            }
        }
        return objects;
    },
    fnloadUnreadChat: function () {
        $.ajax({
            url: '/Account/GetAllUnReadChat',
            dataType: "json",
            method: 'GET',
            success: function (data) {
                if (parseInt(data.data.total) > 0) {
                    $('#count').html(parseInt(data.data.total));
                    $("#count").css("display", "inline-block");
                }
                else {
                    $("#count").css("display", "none");
                }
                for (var groupData in data.data) {
                    if ($("#count_" + groupData).length > 0 && parseInt(data.data[groupData])>0) {
                        $("#count_" + groupData).html(parseInt(data.data[groupData]));
                        $("#count_" + groupData).css("display", "inline-block");
                    }
                    else {
                        $("#count_" + groupData).css("display", "none");
                    }
                }
                
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    },
    fnloadnewgroup: function (userid) {
        $.ajax({
            url: '/Account/LoadNewGroup',
            dataType: "json",
            data: { 'userID': userid },
            method: 'GET',
            success: function (data) {
                if (data.data == null) {
                    window.location.href = '/Account/Verify';
                }                
                else if (data.data.groupname != null) {
                    window.location.href = '/Account/Message/';
                }
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    }
};