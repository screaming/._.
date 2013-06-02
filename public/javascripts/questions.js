var Socket = undefined;

var Question = Backbone.Model.extend({
  initialize: function() {
  },
  defaults: {
    // slide location
    'location': {
      'x': 0,
      'y': 0,
      'pageurl': '',
    },
    // repeat or question
    'type': 0,
    // for question
    'str': '',
    // done, or to be answer
    'state': 0,
    // +1
    'count': 0,
  },
});

var Questions = Backbone.Collection.extend({
  initialize: function(options) {
  },
  model: Question,
});

var QuestionView = Backbone.View.extend({
  initialize: function() {
    this.collection.bind('add', this.addQuestion, this);
    this.collection.bind('change:state', this.changeQuestionState, this);
    this.collection.bind('change:count', this.changeQuestionCount, this);
    // this.$el.append("<ul class='question-list'></ul>");
  },
  events: {
    'click .content': 'doneQuestion',
    'click .plus': 'plusOneQuestion',
  },
  addQuestion: function(model) {
    console.log(model);
    var obj = $('<div class="one-question"><div class="content"></div><div class="plus"></div></div>');
    obj.attr("mid", model.cid);
    // console.log(model.get('location'));
    if (1 == model.get('type')) {
      $(".content", obj).html(model.get('str'));
    } else {
      $(".content", obj).html("repeat please!!");
    }
    // obj.append($("<button class='done-btn'>done</button><button class='plus-btn'>+1</button>"));
    console.log('model', this.el);
    $(this.el).append(obj);
  },
  changeQuestionState: function(model) {
    console.log('changeQuestionState', model);
    var mid = model.cid
    $("[mid="+mid+"]").remove();
  },
  changeQuestionCount: function(model) {
    // TODO: show the count number!
    console.log('client:change', model);
  },
  doneQuestion: function(event) {
    var id = $(event.target).parent().attr('mid');
    var model = this.collection.get(id);
    var state = model.get('state');
    model.set('state', 1);

    // TODO: socket.io.emit
    socket.emit('client:ask', model.toJSON());
  },
  plusOneQuestion: function(event) {
    var id = $(event.target).parent().attr('mid');
    var model = this.collection.get(id);
    var count = model.get('count');
    model.set('count', count + 1);

    // TODO: socket.io.emit
  }

});
/*
  var questionCollection = new Questions();

  var view = new QuestionView({
    el: $("#questions"),
    collection: questionCollection
  });

  $('#test-btn').click(function() {
    questionCollection.add(new Question({
      'location': {
        'x': 1,
        'y': 1,
        'pageurl': '/123',
      },
      // repeat or question
      'type': 1,
      // for question
      'str': 123,
      // done, or to be answer
      'state': 0,
      // +1
      'count': 1,
    }));
  });

*/