

const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;

class App extends React.Component {
  title = (
    <div className="alert alert-info" role="alert">
      <b>Work6 :</b> Firebase
    </div>
  );

  footer = (
    <div>
      By 643021248-7 Ruangthiwa Taeudomchok<br />
      College of Computing, Khon Kaen University
    </div>
  );

  state = {
    scene: 0,
    students: [],
    stdid: "",
    stdtitle: "",
    stdfname: "",
    stdlname: "",
    stdemail: "",
    stdphone: "",
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">{this.title}</div>
        <div className="card-body">
          <button className="btn btn-primary" onClick={() => this.readData()}>Read Data</button>
          <button className="btn btn-primary" onClick={() => this.autoRead()}>Auto Read</button>
          <div>
            <StudentTable data={this.state.students} app={this} />
          </div>
        </div>
        <div className="card-footer">
          <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b>
          <br />
          <TextInput label="ID" app={this} value="stdid" style={{ width: '120px' }} />
          <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{ width: '100px' }} />
          <TextInput label="ชื่อ" app={this} value="stdfname" style={{ width: '120px' }} />
          <TextInput label="สกุล" app={this} value="stdlname" style={{ width: '120px' }} />
          <TextInput label="Email" app={this} value="stdemail" style={{ width: '150px' }} />
          <TextInput label="Phone" app={this} value="stdphone" style={{ width: '120px' }} />
          <button className="btn btn-success" onClick={() => this.insertData()}>Save</button>
        </div>
        <div className="card-footer">{this.footer}</div>
      </div>
    );
  }

  readData() {
    db.collection("students")
      .get()
      .then((querySnapshot) => {
        var stdlist = [];
        querySnapshot.forEach((doc) => {
          stdlist.push({ id: doc.id, ...doc.data() });
        });
        console.log(stdlist);
        this.setState({ students: stdlist });
      });
  }

  autoRead() {
    db.collection("students").onSnapshot((querySnapshot) => {
      var stdlist = [];
      querySnapshot.forEach((doc) => {
        stdlist.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ students: stdlist });
    });
  }

  insertData() {
    db.collection("students").doc(this.state.stdid).set({
      title: this.state.stdtitle,
      fname: this.state.stdfname,
      lname: this.state.stdlname,
      phone: this.state.stdphone,
      email: this.state.stdemail,
    });
  }

  edit(std) {
    this.setState({
      stdid: std.id,
      stdtitle: std.title,
      stdfname: std.fname,
      stdlname: std.lname,
      stdemail: std.email,
      stdphone: std.phone,
    });
  }

  delete(std) {
    if (window.confirm("ต้องการลบข้อมูล")) {
      db.collection("students").doc(std.id).delete();
    }
  }
}

const container = document.getElementById("myapp");
const root = ReactDOM.createRoot(container);
root.render(<App />);



const firebaseConfig = {
  apiKey: "AIzaSyBlh3BQp2XAjyMxb00wZ-TBS78RKtT7elo",
  authDomain: "web2566-47d9e.firebaseapp.com",
  projectId: "web2566-47d9e",
  storageBucket: "web2566-47d9e.appspot.com",
  messagingSenderId: "244933640486",
  appId: "1:244933640486:web:a47cc9f5653d7f673981e7",
  measurementId: "G-9HRFG9Q4WR"
};
firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();

    

function TextInput({ label, app, value, style }) {
  return (
    <label className="form-label">
      {label}:
      <input
        className="form-control"
        style={style}
        value={app.state[value]}
        onChange={(ev) => {
          var s = {};
          s[value] = ev.target.value;
          app.setState(s);
        }}
      />
    </label>
  );
}

// React component for EditButton
function EditButton({ std, app }) {
  return <button onClick={() => app.edit(std)}>แก้ไข</button>;
}

// React component for DeleteButton
function DeleteButton({ std, app }) {
  return <button onClick={() => app.delete(std)}>ลบ</button>;
}

// React component for StudentTable
function StudentTable({ data, app }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>รหัส</th>
          <th>คำนำหน้า</th>
          <th>ชื่อ</th>
          <th>สกุล</th>
          <th>email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.title}</td>
            <td>{s.fname}</td>
            <td>{s.lname}</td>
            <td>{s.email}</td>
            <td>
              <EditButton std={s} app={app} />
              <DeleteButton std={s} app={app} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



