$(function() {
  loadStories();

  $("#addBtn").click(addStory);
  $("#refreshBtn").click(loadStories);
  $("#stories").on("click", ".btn-danger", deleteStory);
  $("#stories").on("click", ".btn-warning", editStory);
});

function loadStories() {
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "GET",
    success: function(data) {
      $("#stories").empty();
      for (let s of data) {
        $("#stories").append(`
          <div class="story border p-3 mb-2" data-id="${s.id}">
            <h5>${s.title}</h5>
            <p>${s.content}</p>
            <button class="btn btn-warning btn-sm">Edit</button>
            <button class="btn btn-danger btn-sm">Delete</button>
          </div>
        `);
      }
    },
    error: function() {
      $("#stories").html("Error loading stories");
    }
  });
}

function addStory() {
  let title = $("#title").val();
  let content = $("#content").val();

  if (!title || !content) {
    alert("Please fill both fields!");
    return;
  }

  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "POST",
    data: { title, content },
    success: function() {
      $("#title").val("");
      $("#content").val("");
      loadStories();
    }
  });
}

function deleteStory() {
  let id = $(this).closest(".story").attr("data-id");

  if (confirm("Delete this story?")) {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + id,
      method: "DELETE",
      success: function() {
        loadStories();
      }
    });
  }
}

function editStory() {
  let box = $(this).closest(".story");
  let id = box.attr("data-id");
  let oldTitle = box.find("h5").text();
  let oldContent = box.find("p").text();

  box.html(`
    <input id="newTitle" class="form-control mb-2" value="${oldTitle}">
    <textarea id="newContent" class="form-control mb-2">${oldContent}</textarea>
    <button class="btn btn-primary btn-sm save">Save</button>
    <button class="btn btn-secondary btn-sm cancel">Cancel</button>
  `);

  box.on("click", ".save", function() {
    let newTitle = $("#newTitle").val();
    let newContent = $("#newContent").val();

    if (!newTitle || !newContent) {
      alert("Both fields required!");
      return;
    }

    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories/" + id,
      method: "PUT",
      data: { title: newTitle, content: newContent },
      success: function() {
        alert("Story updated!");
        loadStories();
      }
    });
  });

  box.on("click", ".cancel", loadStories);
}
