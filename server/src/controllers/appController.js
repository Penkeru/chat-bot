
export class AppController {
  appController;
  constructor(app) {
    this.appController = app;
  }

  attachControllers() {
    this.appController.get('/', (req, res) => {
      res.send('I am good to go!');
    });
  }


}