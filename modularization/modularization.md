title: The front-end componentization development
speaker: William Yang
transition: slide
theme: light

[slide]
<h1 class="blue3">The front-end componentization development</h1>

----

<div class="pull-right text-primary">
  William Yang
  <br/><br/>
  <small>Jan-22-2016</small>
</div>

[slide]
# Agenda
 * Why need componentization?
 * What is front-end componentization?
 * How to componentize in front-ends ?

[slide]
## Why need componentization ?
* Resource redundancy {:&.fadeIn}
* Too complex relationship
* Hard to do unit test

[slide]
## Why need componentization ?
<blockquote class="blue">Current request workflow :
    <img src="/img/old.png" />
    <blockquote class="blue pull-right">
      <br/>
    </blockquote>
</blockquote>

[slide]
## Why need componentization ?
<blockquote class="blue">Request workflow after componentization:
    <img src="/img/new.png" />
    <blockquote class="blue pull-right">
      <br/>
    </blockquote>
</blockquote>

[slide]
## What is front-end componentization?
* Resource - On demand loading {:&.fadeIn}
* Clear and single responsibility
* Easy to do unit test

[slide]
## What is front-end componentization?
<blockquote class="blue">Lifecycle
    <img src="/img/Lifecycle.png" />
    <blockquote class="blue pull-right">
      <br/>
    </blockquote>
</blockquote>

* init: Initializes components root node and configuration. {:&.fadeIn}
* fetch: Load css and js resources.
* render: Render the content.
* ready: Data binging.
* update: Data update.
* destroy: Remove all event's listener and delete all component's nodes.

[slide]
## How to componentize in front-ends ?
<blockquote class="blue">Directory structure
  <br/>
    <img src="/img/riotdemo.png" />
    <blockquote class="blue pull-right">
      components -
      <br/> 
      libs -
      <br>
      modules -
      <br>
    </blockquote>
</blockquote>

<a href="http://yangwi-9-w7:3000/riotdemo/modules/index.html">Demo</a> 
[slide]
## How to componentize in front-ends ?
### login.html

```
<html>
  <msg-box></msg-box>
  <table>
      <username-input></username-input>
      <password-input></password-input>
    <tr>
      <td>
        <button id="loginBtn">Login</button>
      </td>
    </tr>
  </table>

  <script type="text/javascript" src="../../libs/jquery-1.11.2.min.js"></script>
  <script type="text/javascript" src="../../libs/riot+compiler.js"></script>
  <script type="riot/tag" src="../../components/usernameInput.tag"></script>
  <script type="riot/tag" src="../../components/passwordInput.tag"></script>
  <script type="riot/tag" src="../../components/msgBox.tag"></script>
  <script type="text/javascript" src="./login.js"></script>
</html>
```

[slide]
## How to componentize in front-ends ?
### register.html

```
<html>
  <msg-box></msg-box>
  <table>
      <username-input></username-input>
      <password-input></password-input>
    <tr>
      <td>
        <button id="registerBtn">Register</button>
      </td>
    </tr>
  </table>

  <script type="text/javascript" src="../../libs/jquery-1.11.2.min.js"></script>
  <script type="text/javascript" src="../../libs/riot+compiler.js"></script>
  <script type="riot/tag" src="../../components/usernameInput.tag"></script>
  <script type="riot/tag" src="../../components/passwordInput.tag"></script>
  <script type="riot/tag" src="../../components/msgBox.tag"></script>
  <script type="text/javascript" src="./register.js"></script>
</html>
```

[slide]
## How to componentize in front-ends ?
### usernameInput.tag

```
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
```

[slide]
## How to componentize in front-ends ?
### msgBox.tag

```
<msg-box>
  <div id="msgBox" class="msgBox"></div>
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
```

[slide]
## Framework

* React.js
* <a href="http://localhost:8080/index.html">vue.js</a>

[slide]

# Thank you!

