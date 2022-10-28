## Classes

<dl>
<dt><a href="#DiskAccessObject">DiskAccessObject</a></dt>
<dd><p>Provides an interface for accessing and retrieving static files from the local FS</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#attachFileSysFuncs">attachFileSysFuncs()</a></dt>
<dd><p>Attaches file system functions to the object</p>
</dd>
<dt><a href="#readDirectory">readDirectory(path, recurse)</a></dt>
<dd><p>Reads and returns the contents of a directory</p>
</dd>
</dl>

<a name="DiskAccessObject"></a>

## DiskAccessObject
Provides an interface for accessing and retrieving static files from the local FS

**Kind**: global class  
<a name="attachFileSysFuncs"></a>

## attachFileSysFuncs()
Attaches file system functions to the object

**Kind**: global function  
<a name="readDirectory"></a>

## readDirectory(path, recurse)
Reads and returns the contents of a directory

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to be loaded from |
| recurse | <code>boolean</code> | <code>false</code> | whether to recurse into child folders |

