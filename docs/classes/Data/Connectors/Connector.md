## Functions

<dl>
<dt><a href="#update">update()</a></dt>
<dd></dd>
<dt><a href="#getReadOnly">getReadOnly()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Returns current read only status</p>
</dd>
<dt><a href="#connect">connect()</a></dt>
<dd><p>Stub to throw errors if the child connector doesn&#39;t implement this method</p>
</dd>
<dt><a href="#read">read(inputQuery, values)</a> ⇒ <code>Object</code></dt>
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
<dt><a href="#exec">exec(inputQuery, values)</a></dt>
<dd><p>Executes query</p>
</dd>
<dt><a href="#throwDBError">throwDBError(message)</a></dt>
<dd><p>Throws database related error</p>
</dd>
<dt><a href="#compareDAOProps">compareDAOProps()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Compares the methods and properties to the list of required items.</p>
</dd>
</dl>

<a name="update"></a>

## update()
**Kind**: global function  
**Properties**

| Name | Description |
| --- | --- |
| dataPath | Path to database data files |

<a name="getReadOnly"></a>

## getReadOnly() ⇒ <code>Boolean</code>
Returns current read only status

**Kind**: global function  
<a name="connect"></a>

## connect()
Stub to throw errors if the child connector doesn't implement this method

**Kind**: global function  
**Throws**:

- <code>DatabaseError</code> 

<a name="read"></a>

## read(inputQuery, values) ⇒ <code>Object</code>
Executes DQL queries

**Kind**: global function  
**Returns**: <code>Object</code> - Database query result  
**Throws**:

- <code>DatabaseError</code> 


| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: SELECT * FROM Table WHERE field = ? |
| values | <code>Array</code> \| <code>Object</code> |  |

<a name="create"></a>

## create(inputQuery, values) ⇒ <code>Object</code>
Executes DML INSERT queries

**Kind**: global function  
**Returns**: <code>Object</code> - Database query result  
**Throws**:

- <code>DatabaseError</code> 


| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: INSERT INTO Table (field) VALUES (?) |
| values | <code>Array</code> \| <code>Object</code> |  |

<a name="update"></a>

## update(inputQuery, values) ⇒ <code>Object</code>
Executes DML UPDATE queries

**Kind**: global function  
**Returns**: <code>Object</code> - Database query result  
**Throws**:

- <code>DatabaseError</code> 


| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: UPDATE Table SET field = ? WHERE otherField = ? |
| values | <code>Array</code> \| <code>Object</code> |  |

<a name="delete"></a>

## delete(inputQuery, values) ⇒ <code>Object</code>
Executes DML DELETE queries

**Kind**: global function  
**Returns**: <code>Object</code> - Database query result  
**Throws**:

- <code>DatabaseError</code> 


| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query input, i.e.: DELETE FROM Table WHERE field = ? |
| values | <code>Array</code> \| <code>Object</code> |  |

<a name="exec"></a>

## exec(inputQuery, values)
Executes query

**Kind**: global function  
**Throws**:

- <code>DatabaseError</code> 


| Param | Type | Description |
| --- | --- | --- |
| inputQuery | <code>string</code> | Parameterized query to run |
| values | <code>Array</code> \| <code>Object</code> | query parameters |

<a name="throwDBError"></a>

## throwDBError(message)
Throws database related error

**Kind**: global function  

| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="compareDAOProps"></a>

## compareDAOProps() ⇒ <code>Boolean</code>
Compares the methods and properties to the list of required items.

**Kind**: global function  
