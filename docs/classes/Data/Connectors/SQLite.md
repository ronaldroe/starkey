## Functions

<dl>
<dt><a href="#connect">connect()</a> ⇒ <code>SQLiteConnector</code></dt>
<dd><p>Sets the connection object</p>
</dd>
<dt><a href="#getConnection">getConnection()</a> ⇒ <code>Object</code></dt>
<dd><p>Returns the connection object</p>
</dd>
<dt><a href="#read">read(inputQuery, [values])</a> ⇒ <code>Object</code></dt>
<dd><p>Executes DQL queries</p>
</dd>
<dt><a href="#create">create(inputQuery, values)</a> ⇒ <code>Object</code></dt>
<dd><p>Executes DML INSERT queries</p>
</dd>
<dt><a href="#update">update(inputQuery, values)</a> ⇒ <code>Object</code></dt>
<dd><p>Executes DML UPDATE queries</p>
</dd>
<dt><a href="#delete">delete(inputQuery, values)</a> ⇒ <code>Object</code></dt>
<dd><p>Executes DML DELETE queries</p>
</dd>
<dt><a href="#exec">exec(inputQuery, values)</a> ⇒ <code>Object</code></dt>
<dd><p>Executes a query as a prepared statement</p>
</dd>
</dl>

<a name="connect"></a>

## connect() ⇒ <code>SQLiteConnector</code>
Sets the connection object

**Kind**: global function  
<a name="getConnection"></a>

## getConnection() ⇒ <code>Object</code>
Returns the connection object

**Kind**: global function  
**Returns**: <code>Object</code> - connection object  
<a name="read"></a>

## read(inputQuery, [values]) ⇒ <code>Object</code>
Executes DQL queries

**Kind**: global function  
**Returns**: <code>Object</code> - query result  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| inputQuery | <code>string</code> |  | Parameterized query input, i.e.: SELECT * FROM Table WHERE field = ? |
| [values] | <code>Array</code> \| <code>Object</code> | <code>[]</code> | values for parameterized query |

<a name="create"></a>

## create(inputQuery, values) ⇒ <code>Object</code>
Executes DML INSERT queries

**Kind**: global function  
**Returns**: <code>Object</code> - query result  

| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: INSERT INTO Table (field) VALUES (?) |
| values | <code>Array</code> \| <code>Object</code> | values for parameterized query |

<a name="update"></a>

## update(inputQuery, values) ⇒ <code>Object</code>
Executes DML UPDATE queries

**Kind**: global function  
**Returns**: <code>Object</code> - query result  

| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: UPDATE Table SET field = ? WHERE otherField = ? |
| values | <code>Array</code> \| <code>Object</code> | values for parameterized query |

<a name="delete"></a>

## delete(inputQuery, values) ⇒ <code>Object</code>
Executes DML DELETE queries

**Kind**: global function  
**Returns**: <code>Object</code> - query result  

| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: DELETE FROM Table WHERE field = ? |
| values | <code>Array</code> \| <code>Object</code> | values for parameterized query |

<a name="exec"></a>

## exec(inputQuery, values) ⇒ <code>Object</code>
Executes a query as a prepared statement

**Kind**: global function  
**Returns**: <code>Object</code> - query result  

| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input |
| values | <code>Array</code> \| <code>Object</code> | values for parameterized query |

<a name="buildSimpleSelect"></a>

## .buildSimpleSelect(tableName, [description], [wheres], [orderBys], [limit], [offset]) ⇒ <code>string</code>
Static helper method that can build simple select queries programatically

**Kind**: static function  
**Returns**: <code>string</code> - SQL query  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tableName | <code>string</code> |  | Name of the db table |
| [description] | <code>Array.&lt;string&gt;</code> | <code>[&#x27;*&#x27;]</code> | Array of strings containing field names. Does not support subqueries. Aliases should be included in the string "foo AS bar" |
| [wheres] | <code>Array.&lt;Object&gt;</code> |  | Object containing field, type and value of each where clause input. |
| wheres[].field | <code>string</code> |  | Field name |
| [wheres[].type] | <code>string</code> | <code>&quot;&#x27;&#x3D;&#x27;&quot;</code> | Must be one of ['=', 'LIKE', 'IN'] |
| wheres[].value | <code>any</code> \| <code>Array.&lt;any&gt;</code> |  | If type is 'IN', this must be an array |
| [orderBys] | <code>Array.&lt;Object&gt;</code> |  | Object containing field and type of each order by clause input. |
| [orderBys[].type] | <code>string</code> | <code>&quot;&#x27;ASC&#x27;&quot;</code> | Must be one of ['ASC', 'DESC'] |
| [limit] | <code>number</code> |  | query return limit |
| [offset] | <code>number</code> |  | query return offset |

**Example**  
```js
description = ['first_name', 'last_name']
```
**Example**  
```js
wheres = [{ field: 'first_name', type: 'LIKE', value: '%John%' }, { field: 'ID', type: 'IN', value: [1, 2, 3]}]
```
**Example**  
```js
orderBys = [{ field: 'first_name', type: 'DESC' }]
```
