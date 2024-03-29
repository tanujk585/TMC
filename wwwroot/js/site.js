﻿$(document).ready(function () {
    fnShowLoader();
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Restricts input for each element in the set of matched elements to the given inputFilter.
    (function ($) {
        $.fn.inputFilter = function (inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        };
    }(jQuery));

    // Install input filters.
    $(".for-int").inputFilter(function (value) {
        return /^-?\d*$/.test(value);
    });
    $(".for-int-gt0").inputFilter(function (value) {
        return /^\d*$/.test(value);
    });
    $(".for-percentage").inputFilter(function (value) {
        return /^-?\d*[.,]?\d*$/.test(value) && (value === "" || parseInt(value) <= 100);
    });
    $(".for-float").inputFilter(function (value) {
        return /^-?\d*[.,]?\d*$/.test(value);
    });
    $(".for-currency").inputFilter(function (value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value) && (parseInt(value) >= 0);
    });
    $(".for-atoz").inputFilter(function (value) {
        return /^[a-z]*$/i.test(value);
    });

    function fnValidateFormForNull() {
        var resp = true;
        var inputs = $(".required");
        for (var i = 0; i < inputs.length; i++) {
            var currVal = '';
            currVal = $(inputs[i]).val();

            if ($(inputs[i]).attr('type').toLowerCase() == 'text' || $(inputs[i]).attr('type').toLowerCase() == 'date') {
                if (!currVal || currVal.length == 0 || currVal == undefined) {
                    $(inputs[i]).addClass('required-error');
                    resp = false;
                }
            }
            if ($(inputs[i]).attr('type').toLowerCase() == 'number') {
                if (!currVal || currVal.length == 0 || currVal == undefined || currVal == 0) {
                    $(inputs[i]).addClass('required-error');
                    resp = false;
                }
            }

        }

        return resp;
    };

    function fnValidatefileSize(objSize, objType) {
        
        var twoMB = 2048;
        switch (objType) {
            case 'pdf': {
                if (Math.round((objSize / 1024)) > twoMB)
                    return false;
                break;
            }
            case 'image': {
                if (Math.round((objSize / 1024)) > twoMB)
                    return false;
                break;
            }
        }
        return true;
    }
});

// Read a page's GET URL variables and return them as an associative array.
function fngetUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

function fnShowLoader() {
    var divLoader = $('.loader-data');
    if (divLoader.is(':visible')) {
        divLoader.hide();
    }
    else {
        divLoader.css("display", "flex");
    }
};