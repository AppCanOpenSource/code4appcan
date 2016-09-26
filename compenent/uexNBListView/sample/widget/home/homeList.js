var homeListId = 'home_id_1';

function homeInitLayout() {
    var params = {
        listViewId:homeListId,
        layout:{
            center:['res://layoutxml/home/homeListItemLayout.xml']
        }
    };
    var data = JSON.stringify(params);
    uexNBListView.initLayout(data);
}

function homeNew(top, w, h) {
    var params = {
        listViewId:homeListId,
        left:0,
        top:top,
        width:w,
        height:h,
        offsetLeft:0,
        offsetRight:0,
        openType:0,
        swipeMode:3,
        backgroundColor:'#ffffff00' //定义背景颜色为灰色
    };
    var data = JSON.stringify(params);
    
    //alert(data);
    uexNBListView.open(data);
}

function homeSetItems(){



    var arry = [];



    for (var i = 0; i < 100; i++)
    {
        var testData = {
            center:{
                "layoutId":1,
                "backgroundColor":"#dddddd",
                "title":"平凡的世界",
                "height":100
            }
        };

        testData.center.title = "aaa" + i;
        arry.push(testData);
    }

    var params = {
        listViewId:homeListId,
        dataList:arry
    };
    var data = JSON.stringify(params);
   uexNBListView.setItems(data);
}


function registerListViewCallBack() {
    uexNBListView.cbInitLayout = cbInitLayout;
    uexNBListView.cbOpen = cbOpen;
    uexNBListView.cbSetItems = cbSetItems;
    uexNBListView.cbReload = cbReload;
    uexNBListView.onLeftClick = onLeftClick;
    uexNBListView.onRightClick = onRightClick;
    uexNBListView.onListViewItemClick = onListViewItemClick;
    uexNBListView.cbUpdate = cbUpdate;
    uexNBListView.cbInsert = cbInsert;
    uexNBListView.cbDelete = cbDelete;
    uexNBListView.onHtmlEvent = onHtmlEvent;
}


function onHtmlEvent(data){
        alert("onHtmlEvent:" + data);
    }

    function cbDelete(data){
        alert("cbDelete:" + data);
    }

    function cbInsert(data){
        alert("cbInsert:" + data);
    }

    function cbUpdate(data){
        alert("cbUpdate:" + data);
    }

    function onListViewItemClick(data){
        alert("onListViewItemClick:" + data);
    }

    function onRightClick(data){
        alert("onRightClick:" + data);
    }
    function onLeftClick(data){
        alert("onLeftClick:" + data);
    }
    function cbInitLayout(info){
        //alert('cbInitLayout: '+info);
    }

    function cbOpen(info){
        //alert('cbOpen: '+info);
    }

    function cbSetItems(info){
        //alert('cbSetItems: '+info);
    }

    function cbReload(info){
        alert('cbReload: '+info);
    }



