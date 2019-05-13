# Grouped Mod selector

Grouped selector can group data from multiple elements into one record.
The extracted data will be stored as JSON.

## Configuration options
 * selector - [CSS selector] [css-selector] for the elements whose text will be
 extracted and stored in JSON format.
 * attribute name - optionally this selector can extract an attribute of the
 selected element. If specified the extractor will also add this attribute to
 the resulting JSON. It's possible to extract multi attributes (ex: 'src, data-src')
 * JSON - schema for this selector, see example.

#### Schema description
Schema is array of objects. Each object describe one record. Object can contain
next fields: 
* name - name of resulting key
* selector - selector of defined DOM element
* type - text|array|object|attr
* splitter - splitter for object type
* attr - name of attribute for extracting data

## Example

```
[{
    "name": "clinic_diagnosis_program_number",
    "selector": "div.clinic-sp-slider-slide__number",
    "type": "text"
}, {
    "name": "clinic_diagnosis_program_date",
    "selector": "div.clinic-sp-slider-slide__date",
    "type": "text"
}, {
    "name": "clinic_diagnosis_program_doctors",
    "selector": "div.clinic-sp-slider-slide__doctors-item div.clinic-sp-slider-slide__doctors-name",
    "type": "array"
}, {
    "name": "clinic_diagnosis_program_costs",
    "selector": "table.clinic-sp-slider-slide__table tr",
    "type": "object",
    "splitter": "\n\n"
}, {
    "name":"clinic_doctors_image",
    "selector":"img",
    "type":"attr",
    "attr":"data-original"
}]
```

 [css-selector]: ../CSS%20selector.md
