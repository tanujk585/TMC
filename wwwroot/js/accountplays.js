﻿$(document).ready(function () {
    _playsMaster.fnloadData();
});

_playsMaster = {
    fnloadData: function () {
        $.ajax({
            url: '/Account/GetAllPlays',
            dataType: "json",
            method: 'GET',
            success: function (data) {

                var playdataTable = $('table tbody');
                playdataTable.empty();
                var rowCount = 0;
                $(data.data).each(function (index, relationModelObj) {

                    rowCount++;
                    playdataTable.append('<tr><td>' + rowCount + '</td><td>'
                        + relationModelObj.title + '</td><td>' + relationModelObj.writer + '</td><td>'
                        + relationModelObj.director + '</td><td>' + relationModelObj.actor + '</td><td>'
                        + relationModelObj.dateCreated + '</td><td>' +
                        '<span onclick="_playsMaster.fnDelData_ID(' + relationModelObj.id + ')">' +
                        '<i class="bi bi-trash" name="btnDelete" style="cursor:pointer;" data-bs-toggle="tooltip" title="Delete"></i>' +
                        '</span><span onclick="_playsMaster.fnEditData_ID(' + relationModelObj.id + ')">' +
                        '<i class="bi bi-pencil-square" name="btnEdit" style="cursor:pointer;" data-bs-toggle="tooltip" title="Edit"></i>' +
                        '</span></td></tr>');
                });

            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    },
    fnDelData_ID: function (ID) {
        if (confirm('Do you wish to delete?')) {
            $.ajax({
                url: '/Account/DeletePlay',
                dataType: "json",
                method: 'get',
                contentType: "application/json; charset=utf-8",
                data: { objID: ID },
                success: function (result) {
                    alert(result.respmessage);
                    _playsMaster.fnloadData();
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
        }
    },
    fnEditData_ID: function (ID) {
        window.location.href = ('/account/editYourPlay/?editobj=' + ID);
    }
};