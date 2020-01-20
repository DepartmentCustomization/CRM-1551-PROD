(function () {
    return {
        is_obj: undefined,
        is_org: undefined,
        onLoadModalPhone: function () {
            this.modal_phone_NEW = null;
            const queryForGetValue22 = {
                queryCode: 'GetApplicantPhonesForApplicantId',
                parameterValues: [{ key: '@applicant_id', value: this.form.getControlValue('Applicant_Id') }]
            };

            this.queryExecutor.getValues(queryForGetValue22).subscribe(function (data) {

                this.kolvoPhonesForApplicant = data.rows.length - 1;

                if (data.rows.length > 0) {
                    const fieldsForm = {
                        title: 'Телефони заявника',
                        acceptBtnText: 'save',
                        cancelBtnText: 'exit',
                        singleButton: false,
                        fieldGroups: []
                    };

                    for (let j = 0; j < data.rows.length; j++) {
                        if (data.rows[j].values[5] == 1) {

                            var p = {
                                code: 'GroupPhone' + j,
                                name: 'Створення телефону',
                                expand: true,
                                position: data.rows[j].values[0],
                                fields: []
                            };

                            fieldsForm.fieldGroups.push(p);

                            var c = fieldsForm.fieldGroups.length - 1;
                            var t = {
                                code: data.rows[j].values[1],
                                fullScreen: true,
                                hidden: false,
                                placeholder: data.rows[j].values[2],
                                position: 1,
                                required: false,
                                value: data.rows[j].values[3],
                                disabled: true,
                                type: "text",
                                icon: 'phone_forwarded',
                                iconHint: 'Скопіювати з вхідного номера телефону',
                                maxlength: 14,
                                width: '50%'
                            };
                            fieldsForm.fieldGroups[c].fields.push(t);

                            var t0_0 = {
                                code: data.rows[j].values[1] + '_phoneType',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Тип',
                                position: 2,
                                required: false,
                                value: "Мобільний",
                                keyValue: 1,
                                listKeyColumn: "Id",
                                listDisplayColumn: "name",
                                type: "select",
                                queryListCode: "dir_PhoneTypes_SelectRows",
                                width: '50%'
                            };
                            fieldsForm.fieldGroups[c].fields.push(t0_0);

                            var t0_2 = {
                                code: data.rows[j].values[1] + '_phoneIsMain',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Основний?',
                                position: 3,
                                required: false,
                                value: false,
                                type: "checkbox",
                                width: '50%'
                            };

                            fieldsForm.fieldGroups[c].fields.push(t0_2);


                            var t0_1 = {
                                code: data.rows[j].values[1] + '_phoneDelete',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Додати',
                                position: 4,
                                icon: 'add',
                                required: false,
                                type: "button",
                                width: '50%'
                            };

                            fieldsForm.fieldGroups[c].fields.push(t0_1);

                        } else {
                            var p1 = {
                                code: 'GroupPhone' + j,
                                name: data.rows[j].values[2],
                                expand: true,
                                position: data.rows[j].values[0],
                                fields: []
                            };

                            fieldsForm.fieldGroups.push(p1);

                            var c1 = fieldsForm.fieldGroups.length - 1;
                            var t1_0 = {
                                code: data.rows[j].values[1] + '_phoneNumber',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Номер телефону',
                                position: 1,
                                required: false,
                                value: data.rows[j].values[3],
                                type: "text",
                                maxlength: 14,
                                width: '50%'
                            };
                            fieldsForm.fieldGroups[c1].fields.push(t1_0);

                            var t1_1 = {
                                code: data.rows[j].values[1] + '_phoneType',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Тип',
                                position: 2,
                                required: false,
                                value: data.rows[j].values[7],
                                keyValue: data.rows[j].values[6],
                                listKeyColumn: "Id",
                                listDisplayColumn: "name",
                                type: "select",
                                queryListCode: "dir_PhoneTypes_SelectRows",
                                width: '50%'
                            };
                            fieldsForm.fieldGroups[c1].fields.push(t1_1);

                            var t1_2 = {
                                code: data.rows[j].values[1] + '_phoneIsMain',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Основний?',
                                position: 3,
                                required: false,
                                value: data.rows[j].values[4],
                                type: "checkbox",
                                width: '50%'
                            };

                            fieldsForm.fieldGroups[c1].fields.push(t1_2);

                            if (data.rows[j].values[4]) {
                                var t1_3_0 = {
                                    code: 'phoneDelete_Disabled',
                                    fullScreen: true,
                                    hidden: false,
                                    placeholder: 'Видалити',
                                    position: 4,
                                    required: false,
                                    icon: 'delete',
                                    type: "button",
                                    width: '50%'
                                };

                                fieldsForm.fieldGroups[c1].fields.push(t1_3_0);
                            } else {
                                var t1_3_1 = {
                                    code: data.rows[j].values[1] + '_phoneDelete',
                                    fullScreen: true,
                                    hidden: false,
                                    placeholder: 'Видалити',
                                    position: 4,
                                    required: false,
                                    icon: 'delete',
                                    type: "button",
                                    width: '50%'
                                };

                                fieldsForm.fieldGroups[c1].fields.push(t1_3_1);
                            }

                            var t1_4 = {
                                code: data.rows[j].values[1] + '_phoneId',
                                fullScreen: true,
                                hidden: true,
                                placeholder: 'Id',
                                position: 5,
                                value: data.rows[j].values[8],
                                required: false,
                                type: "text",
                                width: '100%'
                            };

                            fieldsForm.fieldGroups[c1].fields.push(t1_4);
                        };
                    };
                    this.openModalForm(fieldsForm, this.onModal_Phone.bind(this), this.afterModal_Phone_FormOpen.bind(this));
                };

            }.bind(this));
        },
        onChangeCardPhone: function (value) {
            for (let u = 0; u < this.kolvoPhonesForApplicant; u++) {
                this.formModalConfig.setControlValue('modal_phone' + (u + 1) + '_phoneIsMain', false);
            };
        },
        onRecalcCardPhone: function () {
            const queryForGetValue_RecalcPhone = {
                queryCode: 'ApplicantPhonesRecalcCardPhone',
                parameterValues: [{ key: '@Applicant_id', value: this.form.getControlValue('Applicant_Id') }]
            };

            this.queryExecutor.getValues(queryForGetValue_RecalcPhone).subscribe(function (data) {
                this.form.setControlValue('CardPhone', data.rows[0].values[0]);
            }.bind(this));

            const queryForGetValue_GetIsMainPhone = {
                queryCode: 'GetApplicantPhonesIsMain',
                parameterValues: [{ key: '@Applicant_id', value: this.form.getControlValue('Applicant_Id') }]
            };

            this.queryExecutor.getValues(queryForGetValue_GetIsMainPhone).subscribe(function (data) {
                this.form.setControlValue('Applicant_Phone_Hide', data.rows[0].values[0]);
            }.bind(this));
        },
        onDeleteCardPhone: function (phone) {
            const queryForGetValue_DeletePhone = {
                queryCode: 'ApplicantPhonesDelete',
                parameterValues: [{ key: '@PhoneId', value: this.formModalConfig.getControlValue('modal_phone' + phone + '_phoneId') }]
            };

            this.queryExecutor.getValues(queryForGetValue_DeletePhone).subscribe(function () {
                var event = new Event("click");
                document.querySelector('smart-bi-modal-form > div.btn-center-control > button.smart-btn.btn-back.ng-star-inserted').dispatchEvent(event);

                this.onLoadModalPhone();
                this.onRecalcCardPhone();

                // Загрузка заявителей по телефону в деталь
                const parameters = [
                    { key: '@applicant_phone', value: this.form.getControlValue('CardPhone') }
                ];
                this.details.loadData('Detail_UGL_Aplicant', parameters);
            }.bind(this));

        },
        afterModal_Phone_FormOpen: function (form) {

            form.formConfig = this;
            this.formModalConfig = form;

            if (this.kolvoPhonesForApplicant > 0) {
                for (let u = 0; u < this.kolvoPhonesForApplicant; u++) {
                    document.getElementById('modal_phone' + (u + 1) + '_phoneIsMain').addEventListener("click", function () {
                        this.formConfig.onChangeCardPhone(true);
                    }.bind(form));
                    if (document.getElementById('modal_phone' + (u + 1) + '_phoneDelete')) {
                        document.getElementById('modal_phone' + (u + 1) + '_phoneDelete').addEventListener("click", function () {
                            this.formConfig.onDeleteCardPhone(u + 1);
                        }.bind(form));
                    };

                    var input = document.getElementById("modal_phone" + (u + 1) + "_phoneNumber");
                    input.addEventListener("input", this.mask, false);
                    input.addEventListener("focus", this.mask, false);
                    input.addEventListener("blur", this.mask, false);
                    input.addEventListener("change", this.mask, false);
                };
                document.getElementById('phoneDelete_Disabled').disabled = true;

                for (let u2 = 0; u2 < this.kolvoPhonesForApplicant; u2++) {
                    document.getElementById("modal_phone" + (u2 + 1) + "_phoneNumber").focus();
                };
            };

            form.onControlValueChanged('modal_phone_NEW', this.onModalPhonesChanged);
            document.getElementById('modal_phone_NEW_phoneDelete').disabled = true;

            if (this.form.getControlValue('Applicant_Id')) {
                document.getElementById('modal_phone_NEW_phoneDelete').addEventListener("click", function () {
                    const queryForGetValue_AddNewPhone = {
                        queryCode: 'ApplicantPhonesAdd',
                        parameterValues: [{ key: '@Applicant_id', value: this.formConfig.form.getControlValue('Applicant_Id') }, { key: '@TypePhone', value: this.getControlValue('modal_phone_NEW_phoneType') }, { key: '@Phone', value: this.getControlValue('modal_phone_NEW') }, { key: '@IsMain', value: this.getControlValue('modal_phone_NEW_phoneIsMain') }]
                    };

                    this.formConfig.queryExecutor.getValues(queryForGetValue_AddNewPhone).subscribe(function (data) {
                        if (data.rows[0].values[0] == "OK") {
                            this.setControlValue('modal_phone_NEW', null);

                            var event = new Event("click");
                            document.querySelector('smart-bi-modal-form > div.btn-center-control > button.smart-btn.btn-back.ng-star-inserted').dispatchEvent(event);

                            this.formConfig.onLoadModalPhone();
                            this.formConfig.onRecalcCardPhone();

                            // Загрузка заявителей по телефону в деталь
                            const parameters = [
                                { key: '@applicant_phone', value: this.form.getControlValue('CardPhone') }
                            ];
                            this.details.loadData('Detail_UGL_Aplicant', parameters);
                        } else {
                            this.setControlValue('modal_phone_NEW', null);
                            this.formConfig.openPopUpInfoDialog('Помилка. Такий номер вже існує!');
                        };
                    }.bind(this));
                }.bind(form));

                var input3 = document.getElementById("modal_phone_NEW");
                input3.addEventListener("input", this.mask, false);
                input3.addEventListener("focus", this.mask, false);
                input3.addEventListener("blur", this.mask, false);
                input3.addEventListener("change", this.mask, false);
                document.getElementById('modal_phone_NEW').focus();
                document.getElementById('modal_phone_NEW_phoneDelete').focus();

                document.getElementById('modal_phone_NEWIcon').addEventListener("click", function () {
                    this.setControlValue('modal_phone_NEW', this.formConfig.form.getControlValue('Phone'));
                    document.getElementById('modal_phone_NEW').focus();
                    document.getElementById('modal_phone_NEW_phoneDelete').focus();
                }.bind(form));
            };
        },
        onModalPhonesChanged: function (phone) {
            if (!phone) {
                document.getElementById('modal_phone_NEW_phoneDelete').disabled = true;
            } else {
                if (phone.replace('(', '').replace(')', '').replace(/-/g, '').replace(/\D/g, '').length == 10) {
                    document.getElementById('modal_phone_NEW_phoneDelete').disabled = false;
                } else {
                    document.getElementById('modal_phone_NEW_phoneDelete').disabled = true;
                };
            };
        },
        onModal_Phone: function (value) {

            if (value) {
                if (this.kolvoPhonesForApplicant > 0) {
                    for (let u = 0; u < this.kolvoPhonesForApplicant; u++) {

                        const queryForGetValue_UpdatePhone = {
                            queryCode: 'ApplicantPhonesUpdate',
                            parameterValues: [{ key: '@Applicant_id', value: this.form.getControlValue('Applicant_Id') },
                            { key: '@TypePhone', value: value.find(f => f.key === '@modal_phone' + (u + 1) + '_phoneType').value },
                            { key: '@Phone', value: value.find(f => f.key === '@modal_phone' + (u + 1) + '_phoneNumber').value },
                            { key: '@IsMain', value: value.find(f => f.key === '@modal_phone' + (u + 1) + '_phoneIsMain').value },
                            { key: '@IdPhone', value: value.find(f => f.key === '@modal_phone' + (u + 1) + '_phoneId').value }]
                        };
                        this.queryExecutor.getValues(queryForGetValue_UpdatePhone).subscribe(function (data) {

                        }.bind(this));

                    };
                    // Загрузка заявителей по телефону в деталь
                    const parameters = [
                        { key: '@applicant_phone', value: this.form.getControlValue('CardPhone') }
                    ];
                    this.details.loadData('Detail_UGL_Aplicant', parameters);
                    this.onRecalcCardPhone();
                };
            };
        },
        init: function () {

            if (this.state == "create") {
                var getDataFromLink = window
                    .location
                    .search
                    .replace('?', '')
                    .split('&')
                    .reduce(
                        function (p, e) {
                            var a = e.split('=');
                            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                            return p;
                        }, {}
                    );

                let uglId;
                if (getDataFromLink["uglId"] == undefined) {
                    uglId = 'невідомо';
                } else {
                    uglId = getDataFromLink["uglId"]
                };

                const queryForGetUGLAppeal = {
                    queryCode: 'CreateAppeal_FromUGL',
                    parameterValues: [
                        {
                            key: '@uglId',
                            value: uglId
                        }
                    ]
                };

                this.queryExecutor.getValue(queryForGetUGLAppeal).subscribe(data => {
                    this.navigateTo('sections/CreateAppeal_UGL/edit/' + data)
                });
            }
            else { // state != create
                this.form.setControlValue('AppealId', this.id);
                this.form.setControlValue('ReceiptSources', { key: 3, value: 'УГЛ' });

                this.checkApplicantHere();

                document.getElementById('CardPhone').addEventListener("click", function () {
                    this.onLoadModalPhone();
                }.bind(this));

                document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
                document.getElementById('Question_Btn_Add').disabled = true;

                this.form.disableControl('ReceiptSources');
                this.form.disableControl('Phone');
                this.form.disableControl('DateStart');
                this.form.disableControl('AppealNumber');
                this.form.disableControl('Appeal_enter_number');
                this.form.disableControl('Applicant_District');
                this.form.disableControl('Applicant_Age');
                this.form.disableControl('ExecutorInRoleForObject');

                this.form.disableControl('Question_OrganizationId');
                this.form.disableControl('Question_ControlDate');

                // Убрать видимость до выяснения обстоятельств
                this.form.setControlVisibility('Question_Building', false);
                this.form.setControlVisibility('entrance', false);
                this.form.setControlVisibility('flat', false);
                this.form.setControlVisibility('Question_Organization', false);
                this.details.setVisibility('Detail_UGL_QuestionNumberAppeal', false);

                // Если Applicant_Id в форме не задан то создавать Questions еще рано (заявителя нету)
                if (this.form.getControlValue('Applicant_Id') == null) {
                    document.getElementById('Question_Aplicant_Btn_Add').disabled = true;
                };
                this.form.onControlValueChanged('Applicant_Id', this.checkApplicantHere);
                this.form.setGroupVisibility('UGL_Group_CreateQuestion', false);

                if (this.form.getControlValue('Applicant_PIB') == null) { document.getElementById('Applicant_Btn_Add').disabled = true; };

                this.form.onControlValueChanged('Applicant_Building', this.getDistrictAndExecutor);
                this.form.onControlValueChanged('Applicant_Building', this.checkApplicantSaveAvailable);
                this.form.onControlValueChanged('Applicant_PIB', this.checkApplicantSaveAvailable);
                this.form.onControlValueChanged('Question_TypeId', this.onChanged_Question_TypeId);
                this.form.onControlValueChanged('Question_TypeId', this.questionObjectOrg);
                this.form.onControlValueChanged('Question_Content', this.checkQuestionRegistrationAvailable);
                this.form.onControlValueChanged('Question_AnswerType', this.onChangedQuestion_AnswerType.bind(this));
                this.form.onControlValueChanged('Question_Building', this.checkQuestionRegistrationAvailable);
                this.form.onControlValueChanged('Question_Organization', this.checkQuestionRegistrationAvailable);

                // Заполнение полей "Загальна інформація"          
                const AppealUGL = {
                    queryCode: 'AppealUGL_Info',
                    parameterValues: [
                        {
                            key: '@Id',
                            value: this.id
                        }
                    ]
                };

                this.queryExecutor.getValues(AppealUGL).subscribe(data => {
                    this.form.setControlValue('Appeal_enter_number', data.rows[0].values[0]);
                    this.form.setControlValue('Phone', data.rows[0].values[1]);
                    this.form.setControlValue('CardPhone', data.rows[0].values[3]);
                    this.form.setControlValue('DateStart', data.rows[0].values[2]);
                    this.form.setControlValue('Applicant_PIB', data.rows[0].values[4]);
                    this.form.setControlValue('Question_Content', data.rows[0].values[5]);
                    this.form.setControlValue('ApplicantUGL', data.rows[0].values[6]);
                    this.form.setControlValue('AppealNumber', data.rows[0].values[8]);
                    this.form.setControlValue('applicantAddress', data.rows[0].values[9]);

                    // Загрузка заявителей по телефону в деталь
                    const parameters = [
                        { key: '@applicant_phone', value: this.form.getControlValue('CardPhone') }
                    ];
                    this.details.loadData('Detail_UGL_Aplicant', parameters);
                });
                // Получение данных выбранного из детали заявителя по телефону             
                this.details.onCellClick('Detail_UGL_Aplicant', this.getApplicantInfo.bind(this));

                //Кнопка "Зберегти" в группе "Заявник"
                document.getElementById('Applicant_Btn_Add').addEventListener("click", function () {
                    let entrance = this.form.getControlValue('Applicant_Entrance');
                    if (entrance != null && entrance < 1) {
                        this.openPopUpInfoDialog('Номер під`їзду не може бути менше 1');
                    }
                    else {
                        const queryForGetValue2 = {
                            queryCode: 'Applicant_UGL_InsertRow',
                            parameterValues: [
                                {
                                    key: '@Applicant_Id',
                                    value: this.form.getControlValue('Applicant_Id')
                                },
                                {
                                    key: '@Applicant_PIB',
                                    value: this.form.getControlValue('Applicant_PIB')
                                },
                                {
                                    key: '@Applicant_Privilege',
                                    value: this.form.getControlValue('Applicant_Privilege')
                                },
                                {
                                    key: '@Applicant_SocialStates',
                                    value: this.form.getControlValue('Applicant_SocialStates')
                                },
                                {
                                    key: '@Applicant_CategoryType',
                                    value: this.form.getControlValue('Applicant_CategoryType')
                                },
                                {
                                    key: '@Applicant_Type',
                                    value: this.form.getControlValue('Applicant_Type')
                                },
                                {
                                    key: '@Applicant_Sex',
                                    value: this.form.getControlValue('Applicant_Sex')
                                },
                                {
                                    key: '@Application_BirthDate',
                                    value: this.form.getControlValue('Applicant_BirthDate')
                                },
                                {
                                    key: '@Applicant_Age',
                                    value: this.form.getControlValue('Applicant_Age')
                                },
                                {
                                    key: '@Applicant_Comment',
                                    value: this.form.getControlValue('Applicant_Comment')
                                },
                                {
                                    key: '@Applicant_Building',
                                    value: this.form.getControlValue('Applicant_Building')
                                },
                                {
                                    key: '@Applicant_HouseBlock',
                                    value: this.form.getControlValue('Applicant_HouseBlock')
                                },
                                {
                                    key: '@Applicant_Entrance',
                                    value: this.form.getControlValue('Applicant_Entrance')
                                },
                                {
                                    key: '@Applicant_Flat',
                                    value: this.form.getControlValue('Applicant_Flat')
                                },
                                {
                                    key: '@AppealId',
                                    value: this.form.getControlValue('AppealId')
                                },
                                {
                                    key: '@Applicant_Phone',
                                    value: this.form.getControlValue('CardPhone')
                                },
                                {
                                    key: '@Applicant_Email',
                                    value: this.form.getControlValue('Applicant_Email')
                                },
                                {
                                    key: '@Applicant_TypePhone',
                                    value: 1
                                }
                            ]
                        };


                        this.queryExecutor.getValues(queryForGetValue2).subscribe(data => {

                            this.form.setControlValue('Applicant_Id', data.rows[0].values[0]);
                            const queryForGetValue3 = {
                                queryCode: 'Appeals_SelectRow',
                                parameterValues: [
                                    {
                                        key: '@Id',
                                        value: this.id
                                    }
                                ]
                            };
                            document.getElementById('Applicant_Btn_Add').disabled = true;
                            this.queryExecutor.getValues(queryForGetValue3).subscribe(data => {

                                // Загрузка заявителей по телефону в деталь
                                const parameters = [
                                    { key: '@applicant_phone', value: this.form.getControlValue('CardPhone') }
                                ];
                                this.details.loadData('Detail_UGL_Aplicant', parameters);

                                const parameters2 = [
                                    { key: '@appealId', value: data.rows[0].values[0] }
                                ];
                                this.details.loadData('Detail_UGL_QuestionRegistration', parameters2);
                            });

                            this.checkApplicantSaveAvailable();
                        });

                    }
                }.bind(this));

                //Кнопка "Очистити" в группе "Заявник"
                document.getElementById('Applicant_Btn_Clear').addEventListener("click", function () {

                    this.form.setControlValue('Applicant_Id', null);
                    this.form.setControlValue('Applicant_PIB', null);
                    this.form.setControlValue('Applicant_District', null);
                    this.form.setControlValue('Applicant_Building', {});
                    this.form.setControlValue('Applicant_HouseBlock', null);
                    this.form.setControlValue('Applicant_Entrance', null);
                    this.form.setControlValue('Applicant_Flat', null);
                    this.form.setControlValue('Applicant_Privilege', {});
                    this.form.setControlValue('Applicant_SocialStates', {});
                    this.form.setControlValue('Applicant_CategoryType', {});
                    this.form.setControlValue('Applicant_Type', {});
                    this.form.setControlValue('Applicant_Sex', null);
                    this.form.setControlValue('Applicant_BirthDate', null);
                    this.form.setControlValue('Applicant_Age', null);
                    this.form.setControlValue('Applicant_Email', null);
                    this.form.setControlValue('Applicant_Comment', null);

                }.bind(this));
                // Отработка кнопки "Додати питання"
                document.getElementById('Question_Aplicant_Btn_Add').addEventListener("click", function () {
                    let build = this.form.getControlValue('Applicant_Building');
                    this.getBuildingInfo(build);
                    this.form.setGroupVisibility('UGL_Group_CreateQuestion', true);
                    this.form.setGroupExpanding('UGL_Group_Aplicant', false);
                    this.form.setGroupExpanding('UGL_Group_Appeal', false);

                    const objNameQuestion_AnswerType = {
                        queryCode: 'dir_AnswerTypes_SelectRow',
                        parameterValues: [
                            {
                                key: '@Id',
                                value: this.form.getControlValue('ReceiptSources')
                            }
                        ]
                    };
                    this.queryExecutor.getValues(objNameQuestion_AnswerType).subscribe(data => {
                        this.form.setControlValue('Question_AnswerType', { key: data.rows[0].values[0], value: data.rows[0].values[1] });
                    });
                }.bind(this));
            }
            //Кнопка "Зберегти" в группе "Реєстрація питання"
            document.getElementById('Question_Btn_Add').addEventListener("click", function () {
                const queryForGetValue3 = {
                    queryCode: 'Question_UGL_InsertRow',
                    parameterValues: [
                        {
                            key: '@AppealId',
                            value: this.form.getControlValue('AppealId')
                        },
                        {
                            key: '@AppealNumber',
                            value: this.form.getControlValue('AppealNumber')
                        },
                        {
                            key: '@Question_TypeId',
                            value: this.form.getControlValue('Question_TypeId')
                        },
                        {
                            key: '@Question_Building',
                            value: this.form.getControlValue('Question_Building')
                        },
                        {
                            key: '@Question_Organization',
                            value: this.form.getControlValue('Question_Organization')
                        },
                        {
                            key: '@Question_EventId',
                            value: this.form.getControlValue('Question_EventId')
                        },
                        {
                            key: '@Question_Content',
                            value: this.form.getControlValue('Question_Content')
                        },
                        {
                            key: '@Question_AnswerType',
                            value: this.form.getControlValue('Question_AnswerType')
                        },
                        {
                            key: '@Applicant_Phone',
                            value: this.form.getControlValue('CardPhone')
                        },
                        {
                            key: '@Applicant_Email',
                            value: this.form.getControlValue('Applicant_Email')
                        },
                        {
                            key: '@Applicant_Building',
                            value: this.form.getControlValue('applicantAddress')
                        },
                        {
                            key: '@Question_OrganizationId',
                            value: this.form.getControlValue('Question_OrganizationId')
                        },
                        {
                            key: '@applicant_id',
                            value: this.form.getControlValue('Applicant_Id')
                        },
                        {
                            key: '@entrance',
                            value: this.form.getControlValue('entrance')
                        },
                        {
                            key: '@flat',
                            value: this.form.getControlValue('flat')
                        },
                        {
                            key: '@Question_ControlDate',
                            value: new Date(this.convertDateNull(this.form.getControlValue('Question_ControlDate')))
                        },
                        {
                            key: '@answer_phone',
                            value: this.form.getControlValue('CardPhone')
                        },
                        {
                            key: '@answer_post',
                            value: this.form.getControlValue('applicantAddress')
                        },
                        {
                            key: '@answer_mail',
                            value: this.form.getControlValue('Applicant_Email')
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForGetValue3).subscribe(data => {
                    const queryForGetValue4 = {
                        queryCode: 'Appeals_SelectRow',
                        parameterValues: [
                            {
                                key: '@Id',
                                value: this.id
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForGetValue4).subscribe(data => {
                        this.form.setControlValue('AppealId', data.rows[0].values[0]);
                        this.form.setControlValue('ReceiptSources', { key: data.rows[0].values[4], value: data.rows[0].values[19] });
                        this.form.setControlValue('AppealNumber', data.rows[0].values[3]);
                        this.form.setControlValue('Phone', data.rows[0].values[5]);
                        this.form.setControlValue('DateStart', new Date());

                        const parameters = [
                            { key: '@phone_number', value: data.rows[0].values[5] }
                        ];
                        this.details.loadData('Detail_UGL_Aplicant', parameters);

                        const parameters2 = [
                            { key: '@appealId', value: this.id }
                        ];
                        this.details.loadData('Detail_UGL_QuestionRegistration', parameters2);
                    });
                });
                this.form.setControlValue('Question_Organization', {});
                this.form.setControlValue('Question_Content', "");
                this.form.setControlValue('Question_TypeId', {});
                this.form.setControlValue('Question_OrganizationId', {});
                this.form.setControlValue('Question_ControlDate', "");
                this.form.setControlValue('Question_EventId', null);
            }.bind(this));
            //Кнопка "Пошук" (за № Звернення) в группе "Загальна інформація"
            this.form.onControlValueChanged('Search_Appeals_Input', this.onChanged_Search_Appeals_Input.bind(this));
            document.getElementById('Search_Appeals_Search').disabled = true;
            document.getElementById('Search_Appeals_Search').addEventListener("click", function (event) {

                const parameters = [
                    { key: '@AppealRegistrationNumber', value: this.form.getControlValue('Search_Appeals_Input') }
                ];
                this.details.loadData('Detail_UGL_QuestionNumberAppeal', parameters/*, filters, sorting*/);
                this.details.setVisibility('Detail_UGL_QuestionNumberAppeal', true);
            }.bind(this));
        },
        // END INIT

        questionObjectOrg: function () {

            let q_type_id = this.form.getControlValue('Question_TypeId');
            if (q_type_id == undefined) {
                this.form.setControlVisibility('Question_Building', false);
                this.form.setControlVisibility('entrance', false);
                this.form.setControlVisibility('flat', false);
                this.form.setControlVisibility('Question_Organization', false);
            }
            else {
                const objAndOrg = {
                    queryCode: 'QuestionTypes_HideColumns',
                    parameterValues: [
                        {
                            key: '@question_type_id',
                            value: q_type_id
                        }
                    ]
                };
                this.queryExecutor.getValues(objAndOrg).subscribe(data => {
                    this.is_org = data.rows[0].values[0];
                    this.is_obj = data.rows[0].values[1];

                    if (this.is_obj === true) {
                        this.form.setControlVisibility('Question_Building', true);
                        this.form.setControlVisibility('entrance', true);
                        this.form.setControlVisibility('flat', true);

                    }
                    else if (this.is_obj !== true) {
                        this.form.setControlVisibility('Question_Building', false);
                        this.form.setControlVisibility('entrance', false);
                        this.form.setControlVisibility('flat', false);
                    }

                    if (this.is_org === true) {
                        this.form.setControlVisibility('Question_Organization', true);
                    }
                    else if (this.is_org !== true) {
                        this.form.setControlVisibility('Question_Organization', false);
                    }

                });
            }
        },

        checkApplicantHere: function () {
            if (this.form.getControlValue('Applicant_Id') != null) {
                document.getElementById('Question_Aplicant_Btn_Add').disabled = false;
                this.form.enableControl('CardPhone');
            }
            else {
                document.getElementById('Question_Aplicant_Btn_Add').disabled = true;
                this.form.disableControl('CardPhone');
            };
        },
        // Условие доступности сохранения заявителя
        checkApplicantSaveAvailable: function () {
            if (this.form.getControlValue('Applicant_PIB') == null || this.form.getControlValue('Applicant_Building') == null) {
                document.getElementById('Applicant_Btn_Add').disabled = true;
            }
            else {
                document.getElementById('Applicant_Btn_Add').disabled = false;
            };
        },
        //Получение данных заявителя
        getApplicantInfo: function (column, row, value, event, indexOfColumnId) {
            let applicantId = row.values[4];

            const Applicant = {
                queryCode: 'Applicant_Info',
                parameterValues: [
                    {
                        key: '@applicantId',
                        value: applicantId
                    }
                ]
            }

            // Наполнение полей заявителя данными выбраного с детали
            this.queryExecutor.getValues(Applicant).subscribe(data => {

                let BirthDate = null;
                if (data.rows[0].values[14] == null) {
                    BirthDate = null;
                } else {
                    BirthDate = new Date(data.rows[0].values[14]);
                };

                let sex = null;
                if (data.rows[0].values[13] == null) {
                    sex = null;
                } else {
                    sex = (data.rows[0].values[13]).toString();
                };

                this.form.setControlValue('Applicant_Building',
                    { key: data.rows[0].values[1], value: data.rows[0].values[2] });
                this.form.setControlValue('Applicant_Entrance', data.rows[0].values[4])
                this.form.setControlValue('Applicant_Flat', data.rows[0].values[5])
                this.form.setControlValue('Applicant_District', data.rows[0].values[6])
                this.form.setControlValue('Applicant_Privilege',
                    { key: data.rows[0].values[7], value: data.rows[0].values[8] });
                this.form.setControlValue('Applicant_SocialStates',
                    { key: data.rows[0].values[9], value: data.rows[0].values[10] });
                this.form.setControlValue('Applicant_Type',
                    { key: data.rows[0].values[11], value: data.rows[0].values[12] });
                this.form.setControlValue('Applicant_Sex', sex);
                this.form.setControlValue('Applicant_BirthDate', BirthDate);
                this.form.setControlValue('Applicant_Email', data.rows[0].values[15]);
                this.form.setControlValue('Applicant_Comment', data.rows[0].values[16]);
                this.form.setControlValue('Applicant_PIB', data.rows[0].values[0]);
                this.form.setControlValue('Applicant_Id', data.rows[0].values[17]);
                this.form.setControlValue('Applicant_Age', data.rows[0].values[18]);
                this.form.setControlValue('ExecutorInRoleForObject', data.rows[0].values[19]);
                this.form.setControlValue('CardPhone', data.rows[0].values[20]);
            });
        },

        // Подстановка ответственной организации и контрольной даты по типу вопроса 
        onChanged_Question_TypeId: function () {
            let questionType = this.form.getControlValue('Question_TypeId');
            this.getOrgExecut();
            this.onQuestionControlDate(questionType);
            this.checkQuestionRegistrationAvailable();
            if (questionType === "" || questionType === null) {
                this.form.setControlValue('Question_Organization', { key: null, value: null });
                this.form.setControlValue('flat', null);
                this.form.setControlValue('entrance', null);
                document.getElementById('Question_Btn_Add').disabled = true;
            }
        },
        getOrgExecut: function () {
            const objAndOrg = {
                queryCode: 'getOrganizationExecutor',
                parameterValues: [
                    {
                        key: '@question_type_id',
                        value: this.form.getControlValue('Question_TypeId')
                    },
                    {
                        key: '@object_id',
                        value: this.form.getControlValue('Question_Building')
                    },
                    {
                        key: '@organization_id',
                        value: this.form.getControlValue('Question_Organization')
                    }
                ]
            };

            this.queryExecutor.getValues(objAndOrg).subscribe(data => {
                this.form.setControlValue('Question_OrganizationId',
                    { key: data.rows[0].values[0], value: data.rows[0].values[1] });
            });
        },
        // Проставить дату контроля
        onQuestionControlDate: function (ques_type_id) {
            if (ques_type_id == null) {
                this.form.setControlValue('Question_ControlDate', null)
            } else {
                const execute = {
                    queryCode: 'list_onExecuteTerm',
                    parameterValues: [{
                        key: '@q_type_id',
                        value: ques_type_id
                    }]
                };
                this.queryExecutor.getValues(execute).subscribe(data => {
                    const d = data.rows[0].values[0];
                    const dat = d.replace('T', ' ').slice(0, 16);
                    this.form.setControlValue('Question_ControlDate', dat)
                });
            }
        },
        // При изменении типа ответа
        onChangedQuestion_AnswerType: function (value) {
            this.form.setControlValue('Question_AnswerPhoneOrPost', null);
            if (value == 2) {
                this.form.setControlValue('Question_AnswerPhoneOrPost', this.form.getControlValue('CardPhone'));
            };

            if (value == 4 || value == 5) {
                this.form.setControlValue('Question_AnswerPhoneOrPost', this.form.getControlValue('applicantAddress'));
            };

            if (value == 3) {
                this.form.setControlValue('Question_AnswerPhoneOrPost', this.form.getControlValue('Applicant_Email'));
            };
            this.checkQuestionRegistrationAvailable();
        },
        // Условия допустимости регистрации Questions`a
        checkQuestionRegistrationAvailable: function () {

            // Куча ифов стартует
            if (this.form.getControlValue('Question_TypeId') != null) {

                if (this.form.getControlValue('Question_Building') == null) {
                    this.form.setControlValue('flat', null);
                    this.form.setControlValue('entrance', null);
                }
                // Случай когда объект вопроса и организация обязательны
                if (this.is_obj == true && this.is_org == true) {
                    let currentObj = this.form.getControlValue('Question_Building');
                    let currentOrg = this.form.getControlValue('Question_Organization');
                    if (currentObj == null || currentOrg == null) {
                        document.getElementById('Question_Btn_Add').disabled = true;
                    }
                    else {

                        if (this.form.getControlValue('Question_Content') != null
                            && this.form.getControlValue('Question_TypeId') != null
                            && this.form.getControlValue('Question_AnswerType') != null) {
                            document.getElementById('Question_Btn_Add').disabled = false;
                        }
                        else {
                            document.getElementById('Question_Btn_Add').disabled = true;
                        }
                    }
                }
                // Случай когда объект вопроса обязательно а орг нет
                if (this.is_obj == true && this.is_org == false) {
                    let currentObj = this.form.getControlValue('Question_Building');
                    if (currentObj == null) {
                        document.getElementById('Question_Btn_Add').disabled = true;
                    }
                    else {
                        if (this.form.getControlValue('Question_Content') != null
                            && this.form.getControlValue('Question_TypeId') != null
                            && this.form.getControlValue('Question_AnswerType') != null) {
                            document.getElementById('Question_Btn_Add').disabled = false;
                        }
                        else {
                            document.getElementById('Question_Btn_Add').disabled = true;
                        }
                    }
                }
                // Случай когда орг вопроса обязательно а объект нет
                if (this.is_obj == false && this.is_org == true) {
                    let currentOrg = this.form.getControlValue('Question_Organization');
                    if (currentOrg == null) {
                        document.getElementById('Question_Btn_Add').disabled = true;
                    }
                    else {
                        if (this.form.getControlValue('Question_Content') != null
                            && this.form.getControlValue('Question_TypeId') != null
                            && this.form.getControlValue('Question_AnswerType') != null) {
                            document.getElementById('Question_Btn_Add').disabled = false;
                        }
                        else {
                            document.getElementById('Question_Btn_Add').disabled = true;
                        }
                    }
                }
            }
        },
        // Если надо по Id дома найти его полный адрес
        getBuildingInfo: function (building) {
            const findBuilding = {
                queryCode: 'SelectBuildName',
                parameterValues: [{
                    key: '@Id',
                    value: building
                }]
            };
            // И подставить объект вопроса = дом заявителя
            this.queryExecutor.getValues(findBuilding).subscribe(data => {
                this.form.setControlValue('Question_Building',
                    { key: data.rows[0].values[0], value: data.rows[0].values[1] });
            });
            this.form.setControlValue('flat', this.form.getControlValue('Applicant_Flat'));
            this.form.setControlValue('entrance', this.form.getControlValue('Applicant_Entrance'));
        },
        convertDateNull: function (value) {
            if (!value) { return this.extractStartDate(); } else { return value; };
        },
        onChanged_Search_Appeals_Input: function (value) {
            if (value == "") {
                document.getElementById('Search_Appeals_Search').disabled = true;
            } else {
                document.getElementById('Search_Appeals_Search').disabled = false;
            };
        },
        getDistrictAndExecutor: function () {
            let building = this.form.getControlValue('Applicant_Building');
            if (building != null && typeof (building) == 'number') {
                const query = {
                    queryCode: 'DistrictAndExecutor_byBuilding',
                    parameterValues: [{
                        key: '@building_id',
                        value: building
                    }]
                };
                this.queryExecutor.getValues(query).subscribe(function (data) {

                    if (data.rows[0] != undefined) {
                        this.form.setControlValue('Applicant_District', data.rows[0].values[1]);
                        this.form.setControlValue('ExecutorInRoleForObject', data.rows[0].values[2]);
                    }
                }.bind(this));
            }
            else {
                this.form.setControlValue('Applicant_District', null);
                this.form.setControlValue('ExecutorInRoleForObject', null);
            }
        }
    };
}());