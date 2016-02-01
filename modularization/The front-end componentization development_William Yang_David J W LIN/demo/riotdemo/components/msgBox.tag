<msg-box>
  <div id="msgBox" class="msgBox">
    
  </div>
  <script>
    this.on('mount', function() {
      $('#msgBox').html(opts.msg);
    }.bind(opts));

  </script>
  <style>
    .msgBox {
      color : red;
    }
  </style>
</msg-box>