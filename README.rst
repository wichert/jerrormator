Jerrormator is a simple javascript library to catch unhandled javascript
errors occuring in a browser and submit those to `errormator
<http://errormator.com/>`_.

Errors are caught via the ``window.onerror`` hook. The following information
is collected and send to errormator:

* Error message
* Filename and line number where the error occured
* The name of function being run (if possible)
* The URL for the current page

Jerrormator has no external dependencies. To use it you need to load its
javascript and initialise it with your errormator PUBLIC API key.

::

   <script type="text/javascript" src="jerrormator.js"></script>
   <script type="text/javascript">
     Jerror.init({api_key: "foo"});
   </script>
