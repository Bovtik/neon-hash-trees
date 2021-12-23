var MobileNavMenu = function MobileNavMenu (props) {
  this.menu = document.querySelector(props.menu);
  this.menuButton = document.querySelector(props.menuButton);

  this.menuButton.addEventListener('click', () => {
    this.toggleMenu();
    this.menuButton.classList.remove('callout');
  });

  this.toggleMenu = function toggleMenu () {
    if (!this.menuButton.classList.contains('active')) {
      this.menu.classList.add('active');
      this.menuButton.classList.add('active');
    } else {
      this.menu.classList.remove('active');
      this.menuButton.classList.remove('active');
    }
  }
}

var mobMenu = new MobileNavMenu({
  menu: '.settings',
  menuButton: '.settings__toggle-button'
});