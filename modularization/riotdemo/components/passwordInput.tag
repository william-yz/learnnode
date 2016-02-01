<password-input>
  

  <tr>
    <td>
      <label for="repeatPasswordInput" if="{opts.isReg}">Repeat : </label>
    </td>
    <td>
      <input type="password" class="password" if="{opts.isReg}" id="repeatPasswordInput"/>
    </td>
  </tr>
  
  <tr>
    <td>
      <label for="passwordInput">Password : </label>
    </td>
    <td>
      <input type="password" class="password" id="passwordInput"/>
    </td>
  </tr>

  <script type="text/javascript">
    this.opts = opts;

    this.on('mount',function() {
      $('#passwordInput').on('keyup', function(e) {
        var taget = $(e.target),
            val = taget.val();
        if (val.length < 6) {
          riot.mount('msg-box',{
            msg : 'Password must have at least 6 characters'
          });
        } else {
          riot.mount('msg-box',{
            msg : ''
          });
        }
      });

      $('#repeatPasswordInput').on('keyup', function(e) {
        var taget = $(e.target),
            val = taget.val();
        if (val !== $('#passwordInput').val()) {
          riot.mount('msg-box',{
            msg : 'Password is not same.'
          });
        } else {
          riot.mount('msg-box',{
            msg : ''
          });
        }
      });


    });

  </script>





</password-input>