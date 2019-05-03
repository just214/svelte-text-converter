<div>
  <header>
    <slot name="header" />
  </header>
  <slot />
  <footer><slot name="footer"/></footer>
</div>

<style>
  div {
    max-width: 960px;
    margin: 0 auto;
    padding: 30px 10px;
    text-align: center;
    height: 100vh;
  }

  header {
		font-family: "Special Elite", sans-serif;
	}
  footer {
    margin-top: 30px;
  }
</style>