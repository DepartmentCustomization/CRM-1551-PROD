(function() {
    return {
        config: {
            query: {
                code: 'IndexOfSpeedToExecution',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [],
            summary: {
                totalItems: []
            },
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            showBorders: false,
            showColumnLines: false,
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
            groupingAutoExpandAll: null
        },
        init: function() {
            this.results = [];
            this.dataGridInstance.height = window.innerHeight - 200;
            this.active = true;
            let msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: true
                }
            };
            this.messageService.publish(msg);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column) {
                    const executor = this.executor;
                    const date = this.period;
                    const ratingId = this.rating;
                    const rdaId = e.row.data.Id;
                    const question = e.row.dataField;
                    const columnSliced = e.column.dataField.slice(0, 7);
                    if(columnSliced === 'Percent') {
                        const params = 'executor=' + executor + '&date=' + date + '&ratingId=' +
                        ratingId + '&rdaId=' + rdaId + '&question=' + question;
                        window.open(
                            location.origin + localStorage.getItem('VirtualPath') +
                            '/dashboard/page/rating_indexes_by_rda_question?' + params
                        );
                    }
                }
            });
            this.sub = this.messageService.subscribe('showTable', this.showTable, this);
            this.sub1 = this.messageService.subscribe('FilterParameters', this.executeQuery, this);
            this.sub2 = this.messageService.subscribe('ApplyGlobalFilters', this.renderTable, this);
            this.sub3 = this.messageService.subscribe('setConfig1', this.setConfig, this);
        },
        showTable: function(message) {
            let tabName = message.tabName;
            if(tabName !== 'tabSpeedDone') {
                this.active = false;
                document.getElementById('containerSpeedDone').style.display = 'none';
            } else {
                this.active = true;
                document.getElementById('containerSpeedDone').style.display = 'block';
                this.renderTable();
            }
        },
        setConfig: function(message) {
            this.config = message.config;
        },
        executeQuery: function(message) {
            this.config.query.parameterValues = [];
            this.period = message.period;
            this.rating = message.rating;
            this.executor = message.executor;
            const parameters = message.parameters;
            const codeResult = 'IndexOfSpeedToExplain_ResultPercent';
            const config = this.config;
            const name = 'getConfig';
            const tab = 1;
            this.messageService.publish({ name, parameters, codeResult, config, tab });
        },
        renderTable: function() {
            if (this.period) {
                if (this.active) {
                    let msg = {
                        name: 'SetFilterPanelState',
                        package: {
                            value: false
                        }
                    };
                    this.messageService.publish(msg);
                    this.loadData(this.afterLoadDataHandler);
                }
            }
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
            this.sub2.unsubscribe();
            this.sub3.unsubscribe();
        }
    };
}());
