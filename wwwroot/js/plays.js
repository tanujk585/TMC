﻿$(document).ready(function () {
    _playsMaster.fnloadData();
});

_playsMaster = {
    fnloadData: function () {
        var objID = fngetUrlVars()["objToken"];
        var objName = fngetUrlVars()["objName"];
        $.ajax({
            url: '/Home/GetPlayByID',
            data: { 'obj': objID, 'objName': objName },
            dataType: "json",
            method: 'GET',
            success: function (data) {
                
                $('.lbltitle').html(data.data.title);
                $('.lbladdedondate').html((data.data.datecreated ? data.data.datecreated : '') + (data.data.duration ? ' - ' + data.data.duration : ''));

                if (data.data.genre) {
                    var genreList = data.data.genre.toString().split(",");
                    for (let index = 0; index < genreList.length; ++index) {
                        $('.lblgenre').append(genreList[index]);
                    }
                }
                if (data.data.langauage) {
                    var languageList = data.data.langauage.toString().split(",");
                    for (let index = 0; index < languageList.length; ++index) {
                        $('.lblLanguage').append(languageList[index]);
                    }
                }

                if (data.data.imageurl) {
                    var sliderList = data.data.imageurl.toString().split(",");
                    for (let index = 0; index < sliderList.length; ++index) {
                        if (index == 0)
                            $('.carousel-inner').append('<div class="carousel-item active"><img class="d-block w-100" src ="/Blogs/Plays/' + sliderList[index] + '" alt ="First slide"></div>');
                        else
                            $('.carousel-inner').append('<div class="carousel-item"><img class="d-block w-100" src ="/Blogs/Sliders/' + sliderList[index] + '" alt ="Sliders"></div>');
                    }
                }

                $('label[name="lblwriter"]').html(data.data.writer);
                $('label[name="lbldirector"]').html(data.data.director);
                $('label[name="lblactor"]').html(data.data.actor);
                $('label[name="lblnoOfShows"]').html(data.data.numbeR_OF_SHOWS);
                $('label[name="lblageSuitable"]').html(data.data.agesuitablefor);
                $('label[name="lbltrailer"]').html('<a href="' + data.data.trailerlink + '" target="_blank">Click to watch</a>');
                $('label[name="lblpremierdate"]').html(data.data.premierdate);
                $('label[name="lblCity"]').html(data.data.city);
                $('p[name="psynopsis"]').html(data.data.synopsis);
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    },
};