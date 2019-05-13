var SelectorGroupMod = {

	canReturnMultipleRecords: function () {
		return false;
	},

	canHaveChildSelectors: function () {
		return false;
	},

	canHaveLocalChildSelectors: function () {
		return false;
	},

	canCreateNewJobs: function () {
		return false;
	},
	willReturnElements: function () {
		return false;
	},
	_getData: function (parentElement) {

		var dfd = $.Deferred();

		// cannot reuse this.getDataElements because it depends on *multiple* property
		var elements = $(this.selector, parentElement);

        var records = [];
        
        const options = this.groupModOptions && JSON.parse(this.groupModOptions) || [];

		$(elements).each(function (k, element) {
            var data = {};

            options.forEach(el => {
                const name = el.name.trim();
                const _elements = $(element).find(el.selector);

                if (!_elements.length) {
                    return;
                }
                switch(el.type) {

                    case 'array': {
                        data[name] = data[name] || [];
                        _elements.each((k, _el) => {
                            const val = $(_el).text().trim();
                            if (val) {
                                data[name].push(val);
                            }
                        });
                        break;
                    }

                    case 'object': {
                        data[name] = data[name] || {};
                        _elements.each((k, _el) => {
                            const v = $(_el).text().trim().split(el.splitter);
                            const key = v[0].trim();
                            const val = v[1];
                            if (key && val) {
                                data[name][key] = val;
                            }
                        });
                        break;
                    }

                    case 'attr': {
                        _elements.each((k, _el) => {
                            const val = _el.getAttribute(el.attr);
                            if (val) {
                                data[name] = val;
                            }
                        });
                        break;
                    }

                    case 'text':
                    case 'default': {
                        const val = _elements.text().trim();
                        if (val) {
                            data[name] = val;
                        }
                        break;
                    }
                }
                
            });

			if (Object.keys(data).length) {
                records.push(data);
            };
		}.bind(this));

		var result = {};
		result[this.id] = records;

		dfd.resolve([result]);
		return dfd.promise();
	},

	getDataColumns: function () {
		return [this.id];
	},

	getFeatures: function () {
		return ['delay', 'datafilter','groupModOptions']
		}
};