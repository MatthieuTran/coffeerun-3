(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';     // CHOOSE ONLY ONE...

    var App = window.App;
    var Truck = App.Truck;
    // var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var rds = new RemoteDataStore();

    // var truck = new Truck('ncc-1701', new DataStore());
    var truck = new Truck('ncc-1701', rds);

    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    rds.getAll().then((orders) => {
        orders.forEach(order => {
            if (order['size']) {
                checkList.addRow.call(checkList, order);
            }
        });
    });
    
    formHandler.addSubmitHandler(function(data) {
        console.log('test');
        return truck.createOrder.call(truck, data)
            .then(() => {
                console.log(data)
                checkList.addRow.call(checkList, data);
            }); 
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
    truck.printOrders(checkList.addRow.bind(checkList));

})(window);