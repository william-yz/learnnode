<username-input>
  <tr>
    <td>
      <label for="usernameInput">E-mail : </label>
    </td>
    <td>
      <input type="text" class="username" id="usernameInput"/>
      <div class="msgBox"></div>
    </td>
  </tr>
  <script type="text/javascript">
    
    this.on('mount',function() {
      

      $('#usernameInput').on('keyup', function(e) {
        var taget = $(e.target),
            val = taget.val();

        if (!val.match(/.+@oocl\.com$/)) {
          riot.mount('msg-box',{
            msg : 'E-mail must match *@oocl.com..'
          });
        } else {
          riot.mount('msg-box',{
            msg : ''
          });
        }
      });
    });
  </script>
</username-input>