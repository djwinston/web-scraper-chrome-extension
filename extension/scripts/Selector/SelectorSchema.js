var SelectorSchema = {

	canReturnMultipleRecords: function () {
		return true;
	},

	canHaveChildSelectors: function () {
		return true;
	},

	canHaveLocalChildSelectors: function () {
		return true;
	},

	canCreateNewJobs: function () {
		return false;
	},
	willReturnElements: function () {
		return false;
	},
	_getData: function (parentElement) {

		var dfd = $.Deferred();

        const options = this.schemaOptions && JSON.parse(this.schemaOptions) || [];

        var result = {};
        result[this.id] = this.processArrayOfObjects(parentElement, options);

		dfd.resolve([result]);
		return dfd.promise();
	},

	getDataColumns: function () {
		return [this.id];
	},

	getFeatures: function () {
		return ['delay', 'datafilter','schemaOptions']
        },



    processText: function (parentElement, rules) {
        const {
            selector
        } = rules;
        const element = parentElement.querySelector(selector);
        return element
            ? this.getBareText(element)
            : '';
    },

    processAttr: function  (parentElement, rules) {
        const {
            selector,
            attr
        } = rules;
        const element = parentElement.querySelector(selector);
        return element
            ? element.getAttribute(attr)
            : '';
    },
            
    processArrayOfObjects: function (parentElement, rules) {
        const {
            schema,
            selector,
            type
        } = rules;

        const start = type === 'object' ? {} : [];

        const elements = parentElement.querySelectorAll(selector);
        return [...elements].reduce((accArr, element) => {

            const one = schema.reduce((acc, rules) => {
                const {
                    type,
                    name
                } = rules;

                switch (type) {
                    case 'text':
                        acc[name] = this.processText(element, rules);
                        break;
                    case 'attr':
                        acc[name] = this.processAttr(element, rules);
                        break;
                    case 'array-of-objects':
                        acc[name] = this.processArrayOfObjects(element, rules);
                        break;
                }

                return acc;
            }, {});

            if (type === 'object') {
                accArr[name] = one;
            } else {
                accArr.push(one);
            }
            return accArr;

        }, start);
    },

    getBareText: function (node) {
        return [].reduce.call(node.childNodes, (a, b) => 
            a + (b.nodeType === 3 ? b.textContent : '')
        , '').trim();
    }

};