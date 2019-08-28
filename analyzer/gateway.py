
# coding: utf-8

# In[1]:


from flask import Flask
from flask import jsonify
from flask import request
import predictTech


# In[3]:


app = Flask(__name__)


# In[13]:


#result = predictTech.predictTechnology('Java')
#result.to_json()


# In[ ]:


@app.route('/rleventtech/<string:technology>', methods=['GET'])
def returnOne(technology):  
    result = predictTech.predictTechnology(technology)
    return result.to_json()

if __name__ == "__main__":
    app.run(debug=True)


# In[ ]:




