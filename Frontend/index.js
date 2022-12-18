const clientIO = io('http://localhost:5000');

clientIO.emit('updateSocketID', '639f770c2a71889c355ae001')

clientIO.on('replay', (data) => {
    console.log(data);
    displayData([data])
})

function displayData(data) {
    var htmlCode = ``;
    for (let i = 0; i < data.length; i++) {
        htmlCode += ` <div class="col-md-4">
        <div class="item border">
            <h2>Caption: ${data[i].text} </h2>
            <h2>Created By: ${data[i].createdBy}</h2>
        </div>
    </div>`
    }
    $('#rowData').html(htmlCode)
}