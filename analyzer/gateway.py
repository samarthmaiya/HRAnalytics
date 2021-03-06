
# coding: utf-8

# In[1]:


from flask import Flask
from flask import jsonify
from flask import request
import predictTech
import predictEmp
import recommendNewTech
import availablejob
import autonomousjob
import createjobNotification
from flask_cors import CORS,cross_origin

# In[3]:


app = Flask(__name__)
#cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


# In[13]:


#result = predictTech.predictTechnology('Java')
#result.to_json()


# In[ ]:


@app.route('/rleventtech/<string:technology>', methods=['GET'])
@cross_origin()
def returnTech(technology):  
    result = predictTech.predictTechnology(technology)
    return result.to_json()

@app.route('/rleventEmp/<string:technology>', methods=['GET'])
@cross_origin()
def returnEmp(technology):  
    empresult = predictEmp.predictEmp(technology)
    return empresult.to_json()

@app.route('/newTech/<string:empid>', methods=['GET'])
@cross_origin()
def returnEmpTech(empid):  
    emptechres = recommendNewTech.recommendNewTech(empid)
    return emptechres.to_json()
    
@app.route('/availablejob/', methods=['GET'])
@cross_origin()
def job():  
    jobdeatils = availablejob.availablejob()
    return jobdeatils.to_json()
    
@app.route('/openjob/', methods=['GET'])
@cross_origin()
def openjob():  
    openjobdeatils = autonomousjob.availablejob()
    print(openjobdeatils)
    return openjobdeatils.to_json(orient='records')
    
@app.route('/createNotification', methods=['POST'])
@cross_origin()
def add_income():
  data = request.get_json()
  createjobNotification.createNotication(data)
  return 'done'

@app.route('/getNotification/<string:id>', methods=['GET'])
@cross_origin()
def getNotificationInfo(id):  
    notificationresult = createjobNotification.getNotification(id)
    return notificationresult.to_json()

if __name__ == "__main__":
    app.run(debug=True)
    #app.run(host='10.148.147.221', debug=True, port=3134)


# In[ ]:




