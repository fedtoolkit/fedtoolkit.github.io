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

        getHeadData();
        getDocumentData();
        getSpeedData();
        getSEOData();

        $("#pageTestBtn").click(function() {
            gtag('event', 'Webpage Test', { event_category: 'Web page test', event_action: 'click', event_label: 'Mouse click' });
            var pageURL = $("#webpagetest").val();
            if (pageURL == "") {
                $("#errMsg").fadeIn();
            } else {
                $("#errMsg").fadeOut();
                runPageTest(pageURL);
                $("#pageTestBtn").attr('disabled', 'disabled');
                $(".pageTestSpinner").fadeIn();
            }
        });

        $('#webpagetest').keypress(function(e) {
            gtag('event', 'Webpage Test', { event_category: 'Web page test', event_action: 'click', event_label: 'Enter Button' });
            var key = e.which;
            if (key == 13) {
                var pageURL = $("#webpagetest").val();
                if (pageURL == "") {
                    $("#errMsg").fadeIn();
                } else {
                    $("#errMsg").fadeOut();
                    runPageTest(pageURL);
                    $("#pageTestBtn").attr('disabled', 'disabled');
                    $(".pageTestSpinner").fadeIn();
                }
            }
        });
    });

    $(document).on("mouseleave", ".refLinkTD", function() {
        $(this).find("a").fadeOut();
    });

    $(document).on("mouseenter", ".refLinkTD", function() {
        $(this).find("a").fadeIn().css("display", "initial");
    });

    $(document).on("change", ".headCheckbox", function() {

        if ($(this).prop("checked") == true) {
            gtag('event', 'Head-tag', { event_category: 'Head tag check', event_action: 'click', event_label: 'Checked' });
            $("#headBar").css("width");
            headProgressCount = 100 / headItemCount;
            headAddPercentage = headAddPercentage + headProgressCount;
            $('#headBar').width(headAddPercentage + "%")
            $("#headProgressPercentage").text(headAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            gtag('event', 'Head-tag', { event_category: 'Head tag check', event_action: 'click', event_label: 'Unchecked' });
            headAddPercentage = headAddPercentage - headProgressCount;
            $('#headBar').width(headAddPercentage + "%");
            $("#headProgressPercentage").text(headAddPercentage.toFixed(1) + "%");
        }
    });

    $(document).on("change", ".documentCheckbox", function() {

        if ($(this).prop("checked") == true) {
            gtag('event', 'HTML-tag', { event_category: 'HTML section check', event_action: 'click', event_label: 'Checked' });
            $("#documentBar").css("width");
            documentProgressCount = 100 / documentItemCount;
            documentAddPercentage = documentAddPercentage + documentProgressCount;
            $('#documentBar').width(documentAddPercentage + "%")
            $("#documentProgressPercentage").text(documentAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            gtag('event', 'HTML-tag', { event_category: 'HTML section check', event_action: 'click', event_label: 'Unchecked' });
            documentAddPercentage = documentAddPercentage - documentProgressCount
            $('#documentBar').width(documentAddPercentage + "%")
            $("#documentProgressPercentage").text(documentAddPercentage.toFixed(1) + "%");
        }
    });

    $(document).on("change", ".speedCheckbox", function() {

        if ($(this).prop("checked") == true) {
            gtag('event', 'Speed-section', { event_category: 'Speed section check', event_action: 'click', event_label: 'Checked' });
            $("#speedBar").css("width");
            speedProgressCount = 100 / speedItemCount;
            speedAddPercentage = speedAddPercentage + speedProgressCount;
            $('#speedBar').width(speedAddPercentage + "%")
            $("#speedProgressPercentage").text(speedAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            gtag('event', 'Speed-section', { event_category: 'Speed section check', event_action: 'click', event_label: 'Unchecked' });
            speedAddPercentage = speedAddPercentage - speedProgressCount
            $('#speedBar').width(speedAddPercentage + "%")
            $("#speedProgressPercentage").text(speedAddPercentage.toFixed(1) + "%");
        }
    });

    $(document).on("change", ".SEOCheckbox", function() {
        if ($(this).prop("checked") == true) {
            gtag('event', 'SEO-section', { event_category: 'SEO section check', event_action: 'click', event_label: 'Checked' });
            $("#SEOBar").css("width");
            SEOProgressCount = 100 / SEOItemCount;
            SEOAddPercentage = SEOAddPercentage + SEOProgressCount;
            $('#SEOBar').width(SEOAddPercentage + "%")
            $("#SEOProgressPercentage").text(SEOAddPercentage.toFixed(1) + "%");
        } else if ($(this).prop("checked") == false) {
            gtag('event', 'SEO-section', { event_category: 'SEO section check', event_action: 'click', event_label: 'Unchecked' });
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
        $.getJSON("https://api.jsonbin.io/b/5b5c95b97b21295367851a3c/1", function(result) {
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
            $("#testStatus").text("Status: Test started successfully");
            setTimeout(function() {
                getPageTestJsonData(result.data.jsonUrl);
            }, 25000);

        });
    }

    function getPageTestJsonData(jsonURL) {
        $.getJSON(jsonURL, function(result) {
            pageTestFlag = result;
            if (pageTestFlag.statusCode != 200) {
                $("#testStatus").text("Status:" + pageTestFlag.statusText);
                setTimeout(function() {
                    getPageTestJsonData(pageTestJsonUrl);
                }, 10000);
            }

            if (pageTestFlag.statusCode == 200) {
                $("#pageTestBtn").removeAttr('disabled');
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
                htmlRequest = (result.data.runs[1].firstView.breakdown.html.requests);
                cssRequest = (result.data.runs[1].firstView.breakdown.css.requests);
                jsRequest = (result.data.runs[1].firstView.breakdown.js.requests);
                imageRequest = (result.data.runs[1].firstView.breakdown.image.requests);
                fontRequest = (result.data.runs[1].firstView.breakdown.font.requests);

                // var options = {
                //     chart: {
                //         width: 380,
                //         type: 'pie',
                //     },
                //     series: [htmlSize, cssSize, jsSize, imageSize, fontSize],
                //     labels: ['HTML', 'CSS', 'JS', 'Images', 'Fonts']

                // }

                // var chart = new ApexCharts(
                //     document.querySelector("#chart-area-bytes"),
                //     options
                // );

                // chart.render();

                // var options2 = {
                //     chart: {
                //         width: 380,
                //         type: 'pie',
                //     },
                //     series: [htmlRequest, cssRequest, jsRequest, imageRequest, fontRequest],
                //     labels: ['HTML', 'CSS', 'JS', 'Images', 'Fonts']

                // }

                // var chart2 = new ApexCharts(
                //     document.querySelector("#chart-area-requests"),
                //     options2
                // );

                // chart2.render();


                var options = {
                    chart: {
                        height: 280,
                        type: 'bar',
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            endingShape: 'rounded',
                            columnWidth: '35%',
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']
                    },
                    series: [{
                        name: 'Size',
                        data: [htmlSize, cssSize, jsSize, imageSize, fontSize]
                    }],
                    xaxis: {
                        categories: ['HTML', 'CSS', 'JS', 'Images', 'Fonts'],
                    },
                    yaxis: {
                        title: {
                            text: 'KBs'
                        }
                    },
                    fill: {
                        opacity: 1

                    },

                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return val + " Kbs"
                            }
                        }
                    }
                }

                var chart = new ApexCharts(
                    document.querySelector("#chart-area-bytes"),
                    options
                );

                chart.render();

                //2

                var options2 = {
                    chart: {
                        height: 280,
                        type: 'bar',
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            endingShape: 'rounded',
                            columnWidth: '35%',
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['#97DFFC', '#858AE3', '#613DC1', '#4E148C', '#2C0735']
                    },
                    series: [{
                        name: 'Size',
                        data: [htmlRequest, cssRequest, jsRequest, imageRequest, fontRequest]
                    }],
                    xaxis: {
                        categories: ['HTML', 'CSS', 'JS', 'Images', 'Fonts'],
                    },
                    yaxis: {
                        title: {
                            text: 'Requests'
                        }
                    },
                    fill: {
                        opacity: 1

                    },
                    // legend: {
                    //     floating: true
                    // },
                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return val + " requests"
                            }
                        }
                    }
                }

                var chart2 = new ApexCharts(
                    document.querySelector("#chart-area-requests"),
                    options2
                );

                chart2.render();
            }
        });
    }