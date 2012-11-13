<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TesteCssValidator.aspx.cs" Inherits="CssValidator.TesteCssValidator" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="jquery.maskedinput-1.2.2.js" type="text/javascript"></script>
<script src="CssVal.js" type="text/javascript"></script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input class="CSSVal_cpf visual" id="Text1" type="text" />
         <input class="CSSVal_cpf test" id="Text2" type="text" />
    </div>
    </form>
</body>
</html>
