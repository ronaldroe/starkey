## Classes

<dl>
<dt><a href="#Loader">Loader</a></dt>
<dd></dd>
</dl>

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
<dt><a href="#generateConfig">generateConfig([configObj], [asObject], [fromDefault])</a> ⇒ <code>object</code> | <code>string</code></dt>
<dd><p>Generates a configuration object as either a JavaScript object or yaml string from a default merged
with an optional configuration.</p>
</dd>
<dt><a href="#toJSON">toJSON()</a> ⇒ <code>string</code></dt>
<dd><p>Returns the config object as a JSON serialized string. This is a stub for future work, but needed soon</p>
</dd>
</dl>

<a name="Loader"></a>

## Loader
**Kind**: global class  

* [Loader](#Loader)
    * [new Loader([altConfigPaths])](#new_Loader_new)
    * [.getPluginsByType([type], [forceReload])](#Loader+getPluginsByType) ⇒ <code>object</code>

<a name="new_Loader_new"></a>

### new Loader([altConfigPaths])
Provides loading for config and static files


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [altConfigPaths] | <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code></code> | Paths to alternate configuration |

<a name="Loader+getPluginsByType"></a>

### loader.getPluginsByType([type], [forceReload]) ⇒ <code>object</code>
Retrieves plugin classes and exports as an object with the plugin's class name as its key.
All plugins are loaded into memory on startup

**Kind**: instance method of [<code>Loader</code>](#Loader)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>string</code> | <code>&quot;&#x27;*&#x27;&quot;</code> | plugin type. Must be one of ['*', 'connectors', 'TBD'] |
| [forceReload] | <code>boolean</code> | <code>false</code> | Force plugins to be loaded from disk |

<a name="getConfig"></a>

## getConfig([path]) ⇒ <code>any</code> \| <code>null</code>
Get requested config by path.

**Kind**: global function  
**Returns**: <code>any</code> \| <code>null</code> - Requested config setting(s) or null if the config could not be found  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [path] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <code>&quot;&#x27;*&#x27;&quot;</code> | Array or dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object |

**Example**  
```js
path = 'database.type'
```
**Example**  
```js
path = ['database', 'type']
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
| configObj | <code>object</code> |  | Complete config object to be written. |
| [configPath] | <code>string</code> | <code>&quot;Loader.configPath&quot;</code> |  |

**Example**  
```js
loader.writeConfig(Loader.merge(loader.getConfig(), configChangeObj));
```
<a name="generateConfig"></a>

## generateConfig([configObj], [asObject], [fromDefault]) ⇒ <code>object</code> \| <code>string</code>
Generates a configuration object as either a JavaScript object or yaml string from a default merged
with an optional configuration.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [configObj] | <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | <code>{}</code> | Configuration object to be merged with the default config. If omitted, will return the default config |
| [asObject] | <code>boolean</code> | <code>true</code> | If true or omitted, returns JavaScript object. If false, returns yaml string |
| [fromDefault] | <code>boolean</code> | <code>true</code> | Whether to include the default config as a base config or use the in-memory config |

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
| [path] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <code>&quot;&#x27;*&#x27;&quot;</code> | Array or dot-separated path to the requested data. Default "*", returns entire config object. Input must exist on the object |

**Example**  
```js
path = 'database.type'
```
**Example**  
```js
path = ['database', 'type']
```
