## Functions

<dl>
<dt><a href="#getConfig">getConfig([path])</a> ⇒ <code>any</code> | <code>null</code></dt>
<dd><p>Get requested config by path.</p>
</dd>
<dt><a href="#recurseConfigPath">recurseConfigPath(pathArray, [configObj], [idx])</a> ⇒ <code>any</code> | <code>null</code></dt>
<dd><p>Recursive function to walk down into the config object and return the requested data</p>
</dd>
<dt><a href="#writeConfig">writeConfig(configObj, [configPath])</a> ⇒ <code>undefined</code></dt>
<dd><p>Writes a configuration object to file</p>
</dd>
<dt><a href="#generateConfig">generateConfig([configObj], [asObject])</a> ⇒ <code>object</code> | <code>string</code></dt>
<dd><p>Generates a configuration object as either a JavaScript object or yaml string from a default merged
with an optional configuration.</p>
</dd>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code>string</code></dt>
<dd><p>Returns the config object as a JSON serialized string. This is a stub for future work, but needed soon</p>
</dd>
</dl>

<a name="getConfig"></a>

## getConfig([path]) ⇒ <code>any</code> \| <code>null</code>
Get requested config by path.

**Kind**: global function  
**Returns**: <code>any</code> \| <code>null</code> - Requested config setting(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;&#x27;*&#x27;&quot;</code> | Dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object |

**Example**  
```js
path = 'database.type'
```
<a name="recurseConfigPath"></a>

## recurseConfigPath(pathArray, [configObj], [idx]) ⇒ <code>any</code> \| <code>null</code>
Recursive function to walk down into the config object and return the requested data

**Kind**: global function  
**Returns**: <code>any</code> \| <code>null</code> - Requested config setting(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pathArray | <code>Array.&lt;string&gt;</code> |  | Array containing the paths to the requested key |
| [configObj] | <code>Object</code> | <code>this.#config</code> | The object being traversed. |
| [idx] | <code>number</code> | <code>0</code> | Current index. Used internally to determine where in the pathArray we are |

<a name="writeConfig"></a>

## writeConfig(configObj, [configPath]) ⇒ <code>undefined</code>
Writes a configuration object to file

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| configObj | <code>object</code> |  | Complete config object to be written. If you need to merge a subset of config changes, this class exposes lodash's merge function as a static method. |
| [configPath] | <code>string</code> | <code>&quot;Loader.configPath&quot;</code> |  |

**Example**  
```js
`loader.writeConfig(Loader.merge(loader.getConfig(), configChangeObj));`
```
<a name="generateConfig"></a>

## generateConfig([configObj], [asObject]) ⇒ <code>object</code> \| <code>string</code>
Generates a configuration object as either a JavaScript object or yaml string from a default merged
with an optional configuration.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [configObj] | <code>object</code> | <code>{}</code> | Configuration object to be merged with the default config. If omitted, will return the default config |
| [asObject] | <code>boolean</code> | <code>true</code> | If true or omitted, returns JavaScript object. If false, returns yaml string |

<a name="toJSON"></a>

## toJSON() ⇒ <code>string</code>
Returns the config object as a JSON serialized string. This is a stub for future work, but needed soon

**Kind**: global function  
<a name="getConfig"></a>

## .getConfig([path]) ⇒ <code>any</code> \| <code>null</code>
Static version of the internal getConfig method that can be used anywhere

**Kind**: static function  
**Returns**: <code>any</code> \| <code>null</code> - Requested config setting(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [path] | <code>string</code> | <code>&quot;&#x27;*&#x27;&quot;</code> | Path to the requested data. Default "*", returns entire config object. Input must exist on the object |

