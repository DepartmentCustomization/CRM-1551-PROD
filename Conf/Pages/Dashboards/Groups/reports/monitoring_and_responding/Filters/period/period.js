(function() {
    return {
        placeholder: 'Дата та час',
        showTime: true,
        type: 'DateTime',
        stepMinute: 1,
        onItemSelect: function(date) {
            this.datePeriod(date);
        },
        datePeriod: function(date) {
            let message = {
                name: '',
                package: {
                    dateFrom: date.dateFrom,
                    dateTo: date.dateTo
                }
            }
            this.messageService.publish(message);
        },
        initValue: function() {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let monthFrom = currentDate.getMonth();
            let dayTo = currentDate.getDate();
            let hh = currentDate.getHours();
            let mm = currentDate.getMinutes();
            let defaultValue = {
                dateFrom: new Date(year, monthFrom - 2 , dayTo, '00', '00'),
                dateTo: new Date(year, monthFrom , dayTo, hh, mm)
            }
            this.setDefaultValue(defaultValue);
        },
        destroy() {
        }
    };
}());
