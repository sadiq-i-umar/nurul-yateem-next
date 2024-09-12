import "./style.css";
const PasswordTAB: React.FC = () => {
  return (
    
    <div className="container">
            <hr className="line"></hr>
          
          <h2>Change Password</h2>
          <p>Your account donation information</p>
          
            <hr className="line2"></hr>

          <div className="form-group">
            <label htmlFor="old-password">Old Password</label>
            <input type="password" id="old-password" placeholder="Password" />
          </div>
    
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" placeholder="Password" />
            <ul className="requirements">
              <li>Lowercase characters</li>
              <li>Uppercase characters</li>
              <li>Numbers</li>
              <li>Max. of 8 characters</li>
            </ul>
          </div>
    
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input type="password" id="confirm-password" placeholder="Password" />
          </div>
    
          <div className="buttons">
            <button className="cancel-btn">Cancel</button>
            <button className="change-btn">Change</button>
          </div>
    
        </div>
    
    
  );
};

export default PasswordTAB;
