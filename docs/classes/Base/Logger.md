## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>Class that logs to the requested log destination</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#log">log(input)</a> ⇒ <code>undefined</code></dt>
<dd></dd>
<dt><a href="#error">error(input, [toFirehose])</a> ⇒ <code>undefined</code></dt>
<dd></dd>
<dt><a href="#logCustom">logCustom(input, [name], [toFirehose])</a> ⇒ <code>undefined</code></dt>
<dd></dd>
<dt><a href="#log">log(input)</a> ⇒ <code>undefined</code></dt>
<dd></dd>
<dt><a href="#error">error(input, [toFirehose])</a> ⇒ <code>undefined</code></dt>
<dd></dd>
<dt><a href="#logCustom">logCustom(input, [name], [toFirehose])</a> ⇒ <code>undefined</code></dt>
<dd></dd>
</dl>

<a name="Logger"></a>

## Logger
Class that logs to the requested log destination

**Kind**: global class  
<a name="log"></a>

## log(input) ⇒ <code>undefined</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | input data to log |

<a name="error"></a>

## error(input, [toFirehose]) ⇒ <code>undefined</code>
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Object</code> |  | input data to log as error |
| [toFirehose] | <code>Boolean</code> | <code>true</code> | whether the input will be logged to the firehose as well |

<a name="logCustom"></a>

## logCustom(input, [name], [toFirehose]) ⇒ <code>undefined</code>
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Object</code> |  | input data to log |
| [name] | <code>string</code> | <code>&quot;&#x27;custom&#x27;&quot;</code> | name of custom log's config name. Default: 'custom' |
| [toFirehose] | <code>Boolean</code> | <code>true</code> | whether the input will be logged to the firehose as well |

<a name="log"></a>

## log(input) ⇒ <code>undefined</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | input data to log |

<a name="error"></a>

## error(input, [toFirehose]) ⇒ <code>undefined</code>
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Object</code> |  | input data to log as error |
| [toFirehose] | <code>Boolean</code> | <code>true</code> | whether the input will be logged to the firehose as well |

<a name="logCustom"></a>

## logCustom(input, [name], [toFirehose]) ⇒ <code>undefined</code>
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>Object</code> |  | input data to log |
| [name] | <code>string</code> | <code>&quot;&#x27;custom&#x27;&quot;</code> | name of custom log's config name. Default: 'custom' |
| [toFirehose] | <code>Boolean</code> | <code>true</code> | whether the input will be logged to the firehose as well |

