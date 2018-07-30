    var headhtml = "",
        headItemCount, headAddPercentage = 0,
        headProgressCount = 0;
    var documenthtml = "",
        documentItemCount, documentAddPercentage = 0,
        documentProgressCount = 0;
    var speedhtml = "",
        speedItemCount, speedAddPercentage = 0,
        speedProgressCount = 0;
    var SEOhtml = "",
        SEOItemCount, SEOAddPercentage = 0,
        SEOProgressCount = 0,
        pageTestFlag, pageTestJsonUrl;

    $(document).ready(function() {

        $(document).ajaxStop(function() {
            $(".htmlDataSpinner").fadeOut();
            console.log("Triggered ajaxStop handler.");
        });

        $('.sidenav').sidenav();
        setInterval(function() {
            $("#tadaIcon").addClass("animated tada");
            setTimeout(function() {
                $("#tadaIcon").removeClass("animated tada");
            }, 2000);
        }, 3000);

        $("#pageTestBtn").click(function() {
            var pageURL = $("#webpagetest").val();
            if (pageURL == "") {
                $("#errMsg").fadeIn();
            } else {
                runPageTest(pageURL);
                $("#pageTestBtn").attr('disabled', 'disabled');
                $(".pageTestSpinner").fadeIn();
            }
        });
        getHeadData();
        getDocumentData();
        getSpeedData();
        getSEOData();
    });

    $(document).on("mouseleave", ".refLinkTD", function() {
        $(this).find("a").fadeOut();
    });

    $(document).on("mouseenter", ".refLinkTD", function() {
        $(this).find("a").fadeIn().css("display", "initial");
    });

    $(document).on("change", ".headCheckbox", function() {
        if ($(this).prop("checked") == true) {
            $("#headBar").css("width");
            headProgressCount = 100 / headItemCount;
            headAddPercentage = headAddPercentage + headProgressCount;
            $('#headBar').width(headAddPercentage + "%")
            $("#headProgressPercentage").text(headAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            headAddPercentage = headAddPercentage - headProgressCount;
            $('#headBar').width(headAddPercentage + "%");
            $("#headProgressPercentage").text(headAddPercentage.toFixed(1) + "%");
        }
    });

    $(document).on("change", ".documentCheckbox", function() {
        if ($(this).prop("checked") == true) {
            $("#documentBar").css("width");
            documentProgressCount = 100 / documentItemCount;
            documentAddPercentage = documentAddPercentage + documentProgressCount;
            $('#documentBar').width(documentAddPercentage + "%")
            $("#documentProgressPercentage").text(documentAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            documentAddPercentage = documentAddPercentage - documentProgressCount
            $('#documentBar').width(documentAddPercentage + "%")
            $("#documentProgressPercentage").text(documentAddPercentage.toFixed(1) + "%");
        }
    });

    $(document).on("change", ".speedCheckbox", function() {
        if ($(this).prop("checked") == true) {
            $("#speedBar").css("width");
            speedProgressCount = 100 / speedItemCount;
            speedAddPercentage = speedAddPercentage + speedProgressCount;
            $('#speedBar').width(speedAddPercentage + "%")
            $("#speedProgressPercentage").text(speedAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            speedAddPercentage = speedAddPercentage - speedProgressCount
            $('#speedBar').width(speedAddPercentage + "%")
            $("#speedProgressPercentage").text(speedAddPercentage.toFixed(1) + "%");
        }
    });

    $(document).on("change", ".SEOCheckbox", function() {
        if ($(this).prop("checked") == true) {
            $("#SEOBar").css("width");
            SEOProgressCount = 100 / SEOItemCount;
            SEOAddPercentage = SEOAddPercentage + SEOProgressCount;
            $('#SEOBar').width(SEOAddPercentage + "%")
            $("#SEOProgressPercentage").text(SEOAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            SEOAddPercentage = SEOAddPercentage - SEOProgressCount
            $('#SEOBar').width(SEOAddPercentage + "%")
            $("#SEOProgressPercentage").text(SEOAddPercentage.toFixed(1) + "%");
        }
    });

    function getHeadData() {
        $.getJSON("https://api.jsonbin.io/b/5b5b7baadc72f955bb796d73", function(result) {
            headItemCount = result.length;
            for (var i = 0; i < result.length; i++) {
                headhtml += "<tr>" +
                    "<td>" + result[i].item + "</td>" +
                    "<td class='refLinkTD'>" + result[i].why + "&nbsp;<a target='_blank' class='refLink'  href='" + result[i].referenceURL + "'>Reference</a></td>" +
                    "<td><label><input type='checkbox' class='headCheckbox'/><span></span></label></td>" +
                    "</tr>";
            }
            $("#headTable").html(headhtml);
        });
    }

    function getDocumentData() {
        $.getJSON("https://api.jsonbin.io/b/5b5c8bcbdc72f955bb799d90", function(result) {
            documentItemCount = result.length;
            for (var i = 0; i < result.length; i++) {
                documenthtml += "<tr>" +
                    "<td>" + result[i].item + "</td>" +
                    "<td class='refLinkTD'>" + result[i].why + "&nbsp;<a target='_blank' class='refLink'  href='" + result[i].referenceURL + "'>Reference</a></td>" +
                    "<td><label><input type='checkbox' class='documentCheckbox'/><span></span></label></td>" +
                    "</tr>";
            }
            $("#documentTable").html(documenthtml);
        });
    }

    function getSpeedData() {
        $.getJSON("https://api.jsonbin.io/b/5b5c8eb4e013915146c8e4d7/1", function(result) {
            speedItemCount = result.length;
            for (var i = 0; i < result.length; i++) {
                speedhtml += "<tr>" +
                    "<td>" + result[i].item + "</td>" +
                    "<td class='refLinkTD'>" + result[i].why + "&nbsp;<a target='_blank' class='refLink'  href='" + result[i].referenceURL + "'>Reference</a></td>" +
                    "<td><label><input type='checkbox' class='speedCheckbox'/><span></span></label></td>" +
                    "</tr>";
            }
            $("#speedTable").html(speedhtml);
        });
    }

    function getSEOData() {
        $.getJSON("https://api.jsonbin.io/b/5b5c95b97b21295367851a3c", function(result) {
            SEOItemCount = result.length;
            for (var i = 0; i < result.length; i++) {
                SEOhtml += "<tr>" +
                    "<td>" + result[i].item + "</td>" +
                    "<td class='refLinkTD'>" + result[i].why + "&nbsp;<a target='_blank' class='refLink'  href='" + result[i].referenceURL + "'>Reference</a></td>" +
                    "<td><label><input type='checkbox' class='SEOCheckbox'/><span></span></label></td>" +
                    "</tr>";
            }
            $("#SEOTable").html(SEOhtml);
        });
    }

    function runPageTest(pageURL) {
        $.getJSON("https://www.webpagetest.org/runtest.php?k=A.e9e4be6997b03f905a27b10ea1de2234&runs=1&fvonly=1&f=json&url=" + encodeURI(pageURL) + "&location=ap-south-1", function(result) {
            console.log("testresult " + result.data.jsonUrl);
            pageTestJsonUrl = result.data.jsonUrl;
            setTimeout(function() {
                getPageTestJsonData(result.data.jsonUrl);
            }, 25000);

        });
    }

    function getPageTestJsonData(jsonURL) {
        $.getJSON(jsonURL, function(result) {
            pageTestFlag = result;
            if (pageTestFlag.statusCode != 200) {
                setTimeout(function() {
                    getPageTestJsonData(pageTestJsonUrl);
                }, 10000);
            }

            if (pageTestFlag.statusCode == 200) {
                $("#pageTestBtn").removeAttr('disabled');
                $("#pageTestBtn").html('Test Successful');
                $(".pageTestSpinner").fadeOut();

                console.log("JSONtestresult " + result.data);
                $("#resultPageHttp").text(result.data.runs[1].firstView.requestsFull);
                $("#resultLoadTime").text(((result.data.runs[1].firstView.fullyLoaded) / 1000).toFixed(2));
                $("#resultPageSize").text(((result.data.runs[1].firstView.bytesIn) / 1000).toFixed(2));
                $("#testResultCard").fadeIn();
                //chart-bytes
                var htmlSize, cssSize, jsSize, imageSize, fontSize;
                htmlSize = (result.data.runs[1].firstView.breakdown.html.bytes) / 1000;
                cssSize = (result.data.runs[1].firstView.breakdown.css.bytes) / 1000;
                jsSize = (result.data.runs[1].firstView.breakdown.js.bytes) / 1000;
                imageSize = (result.data.runs[1].firstView.breakdown.image.bytes) / 1000;
                fontSize = (result.data.runs[1].firstView.breakdown.font.bytes) / 1000;

                var htmlRequest, cssRequest, jsRequest, imageRequest, fontRequest;
                htmlRequest = (result.data.runs[1].firstView.breakdown.html.requests) / 1000;
                cssRequest = (result.data.runs[1].firstView.breakdown.css.requests) / 1000;
                jsRequest = (result.data.runs[1].firstView.breakdown.js.requests) / 1000;
                imageRequest = (result.data.runs[1].firstView.breakdown.image.requests) / 1000;
                fontRequest = (result.data.runs[1].firstView.breakdown.font.requests) / 1000;


                var container = document.getElementById('chart-area-bytes');
                var data = {
                    categories: ['content'],
                    series: [{
                            name: 'HTML',
                            data: htmlSize
                        },
                        {
                            name: 'Javascript',
                            data: jsSize
                        },
                        {
                            name: 'CSS',
                            data: cssSize
                        },
                        {
                            name: 'Images',
                            data: imageSize
                        },
                        {
                            name: 'Fonts',
                            data: fontSize
                        }
                    ]
                };
                var options = {
                    chart: {
                        width: 320,
                        height: 260,
                        title: 'Result breakdown by size'
                    },
                    tooltip: {
                        suffix: 'kb'
                    }
                };
                var theme = {
                    series: {
                        colors: [
                            '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
                            '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
                        ]
                    }
                };
                tui.chart.pieChart(container, data, options);

                //chart


                //chart-requests


                var containerReq = document.getElementById('chart-area-requests');
                var dataReq = {
                    categories: ['content'],
                    series: [{
                            name: 'HTML',
                            data: htmlRequest
                        },
                        {
                            name: 'Javascript',
                            data: jsRequest
                        },
                        {
                            name: 'CSS',
                            data: cssRequest
                        },
                        {
                            name: 'Images',
                            data: imageRequest
                        },
                        {
                            name: 'Fonts',
                            data: fontRequest
                        }
                    ]
                };
                var optionsReq = {
                    chart: {
                        width: 320,
                        height: 260,
                        title: 'Result breakdown by requests'
                    },
                    tooltip: {
                        suffix: 'kb'
                    }
                };
                var themeReq = {
                    series: {
                        colors: [
                            '#773344', '#E3B5A4', '#F5E9E2', '#0B0014', '#D44D5C',
                            '#21295C', '#1B3B6F', '#065A82', '#1C7293', '#9EB3C2'
                        ]
                    }
                };
                tui.chart.pieChart(containerReq, dataReq, optionsReq);

                //chart
            }
        });
    }