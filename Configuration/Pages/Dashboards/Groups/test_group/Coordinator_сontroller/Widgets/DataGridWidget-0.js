(function () {
  return {
    config: {
        query: {
            code: 'CoordinatorController_Doopr_Roz_Prostr_NemMozh',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
           {
                dataField: 'registration_number',
                caption: 'Номер питання',
                fixed: true,
            }, {
                dataField: 'QuestionType',
                caption: 'Тип питання',
                fixed: true,
            }, {
                dataField: 'zayavnykName',
                caption: 'Заявник',
                fixed: true,
            }, {
                dataField: 'adress',
                caption: 'Місце проблеми',
                fixed: true,
            }, {
                dataField: 'OrganizationsName',
                caption: 'Виконавець',
                fixed: true,
            }, {
                dataField: 'control_date',
                caption: 'Дата контролю',
                fixed: true,
                sortOrder: 'desc',
            }
        ],
        masterDetail: {
            enabled: true,
        },
        export: {
            enabled: false,
            fileName: 'No_Competence'
        },
        pager: {
            showPageSizeSelector:  true,
            allowedPageSizes: [10, 15, 30],
            showInfo: true,
        },
        paging: {
            pageSize: 10
        },        
        scrolling: {
            mode: 'standart',
            rowRenderingMode: null,
            columnRenderingMode: null,
            showScrollbar: null
        },
        searchPanel: {
            visible: false,
            highlightCaseSensitive: true
        },
        selection: {
            mode: 'multiple'
        },        
        keyExpr: 'Id',
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        remoteOperations: null,
        allowColumnReordering: null,
        rowAlternationEnabled: null,
        columnAutoWidth: null,
        hoverStateEnabled: true,
        columnWidth: null,
        wordWrapEnabled: true,
        allowColumnResizing: true,
        showFilterRow: true,
        showHeaderFilter: false,
        showColumnChooser: false,
        showColumnFixing: true,
        groupingAutoExpandAll: null,
        sortingMode: 'multiple',
        onRowUpdating: function(data) {},
        onRowExpanding: function(data) {},
        onRowInserting: function(data) {},
        onRowRemoving: function(data) {},
        onCellClick: function(data) {},
        onRowClick: function(data) {},
        selectionChanged: function(data) {}
    },
    sub: [],
    init: function() {
        document.getElementById('table6_rozyasneno').style.display = 'none';
        this.sub = this.messageService.subscribe('clickOnСoordinator_table', this.changeOnTable, this);
        // this.sub1 = this.messageService.subscribe('findAllRows_Rozyasneno_Prozvon', this.findAllRows_Rozyasneno_Prozvon, this);
        // this.sub2 = this.messageService.subscribe('findAllRows_Rozyasneno_Rozyasneno', this.findAllRows_Rozyasneno_Rozyasneno, this);
        
        this.config.onToolbarPreparing = this.createTableButton.bind(this);
        this.config.masterDetail.template = this.createMasterDetail.bind(this);
        
        this.dataGridInstance.onCellClick.subscribe(e => {
            if(e.column.dataField == "registration_number" && e.row != undefined){
                this.goToSection('Assignments/edit/'+e.row.data.Id+'');
            }
        });
    },
    
    createElement: function(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach( key => element[key] = props[key] );
        if(children.length > 0){
            children.forEach( child =>{
                element.appendChild(child);
            });
        } return element;
    },
    createTableButton: function(e) {
            var toolbarItems = e.toolbarOptions.items;

            toolbarItems.push({
                widget: "dxButton", 
                options: { 
                    icon: "check",
                    type: "success",
                    text: "Роз'яснено",
                    onClick: function(e) { 
                         this.findAllRows_Rozyasneno_Rozyasneno();
                    }.bind(this)
                },
                location: "after"
            });
            
            toolbarItems.push({
                widget: "dxButton", 
                options: { 
                    icon: "tel",
                    type: "success",
                    text: "Прозвон",
                    onClick: function(e) { 
                        // this.messageService.publish( { name: 'clickOnFiltersBtn'});
                        this.findAllRows_Rozyasneno_Prozvon();
                    }.bind(this)
                },
                location: "after"
            });
    },
    createMasterDetail: function(container, options) {
        var currentEmployeeData = options.data;
        
        if(currentEmployeeData.short_answer == null){
            currentEmployeeData.short_answer = '';
        }
        let elementAdress__content = this.createElement('div', { className: 'elementAdress__content content', innerText: ""+currentEmployeeData.adress+""});
        let elementAdress__caption = this.createElement('div', { className: 'elementAdress__caption caption', innerText: "Адреса заявника"});
        let elementAdress = this.createElement('div', { className: 'elementAdress element'}, elementAdress__caption, elementAdress__content);
        
        let elementСontent__content = this.createElement('div', { className: 'elementСontent__content content', innerText: ""+currentEmployeeData.question_content+""});
        let elementСontent__caption = this.createElement('div', { className: 'elementСontent__caption caption', innerText: "Зміст"});
        let elementСontent = this.createElement('div', { className: 'elementСontent element'}, elementСontent__caption, elementСontent__content);
        
        let elementComment__content = this.createElement('div', { className: 'elementComment__content content', innerText: ""+currentEmployeeData.short_answer+""});
        let elementComment__caption = this.createElement('div', { className: 'elementComment__caption caption', innerText: "Коментар виконавця"});
        let elementComment = this.createElement('div', { className: 'elementСontent element'}, elementComment__caption, elementComment__content);
        
        
        let elementsWrapper  = this.createElement('div', { className: 'elementsWrapper'}, elementAdress, elementСontent, elementComment);
        container.appendChild(elementsWrapper);
        
        let elementsAll = document.querySelectorAll('.element');
        elementsAll.forEach( el => {
            el.style.display = 'flex';
            el.style.margin = '15px 10px';
        })
        let elementsCaptionAll = document.querySelectorAll('.caption');
        elementsCaptionAll.forEach( el => {
            el.style.minWidth = '200px';
        })
    },
    changeOnTable: function(message){
        if(message.column != 'Роз`яcнено'){
            document.getElementById('table6_rozyasneno').style.display = 'none';
        }else{
            document.getElementById('table6_rozyasneno').style.display = 'block';
            
            // this.config.query.code = 'CoordinatorController_Doopr_Roz_Prostr_NemMozh';
            this.config.query.parameterValues = [ { key: '@navigation', value: message.value}, { key: '@column', value: message.column} ];
            this.loadData(this.afterLoadDataHandler);
        }
    },
    findAllRows_Rozyasneno_Prozvon: function(){
        let rows = this.dataGridInstance.selectedRowKeys;
        let arrivedSendValueRows = rows.join(', ');
        let executeQuery = {
            queryCode: 'Coordinator_Button_Prozvon',
            parameterValues: [ {key: '@Ids', value: arrivedSendValueRows} ],
            limit: -1
        };
        this.queryExecutor(executeQuery);
        
        this.loadData(this.afterLoadDataHandler); 
        
        this.messageService.publish({name: 'reloadAssignmentsTable' });
    },
    findAllRows_Rozyasneno_Rozyasneno: function(){
        let rows = this.dataGridInstance.selectedRowKeys;
        let arrivedSendValueRows = rows.join(', ');
        let executeQuery = {
            queryCode: 'Coordinator_Button_Rozyasneno',
            parameterValues: [ {key: '@Ids', value: arrivedSendValueRows} ],
            limit: -1
        };
        this.queryExecutor(executeQuery);
        
        this.loadData(this.afterLoadDataHandler); 
        
        this.messageService.publish({name: 'reloadAssignmentsTable' });
    },
	afterLoadDataHandler: function(data) {
		this.render();
	},	    
    destroy: function() {
        this.sub.unsubscribe();
        // this.sub1.unsubscribe();
        // this.sub2.unsubscribe();
    }
};
}());
